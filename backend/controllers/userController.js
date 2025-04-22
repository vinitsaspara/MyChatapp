import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {

        const { fullName, password, userName, confirmPassword, gender } = req.body;

        // console.log(fullName, password, userName, confirmPassword, gender);

        if (!fullName || !password || !userName || !confirmPassword || !gender) {
            return res.status(400).json({ message: "Please fill in all fields.", success: false });
        }

        if(password !== confirmPassword){
            return res.status(400).json({ message: "Passwords do not match.", success: false})
        }

        const user = await User.findOne({userName});
        // console.log(user);
        

        if(user){
            return res.status(400).json({ message: "Username already exists.", success: false });
        }

        const hashPassword = await bcrypt.hash(password,10);

        // profile photo

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        await User.create({
            fullName,
            userName,
            password : hashPassword,
            profilePhoto : gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });

        // await User.save();

        res.status(201).json({ message: "User created successfully.", success: true });


    } catch (error) {
        console.log(error);
    }
}

export const login = async (req,res) =>{
    try {
        
        const {userName, password} = req.body;

        if(!userName || !password){
            return res.status(400).json({ message: "Please fill in all fields.", success:false});
        }

        const user = await User.findOne({userName});

        if(!user){
            return res.status(400).json({ message: "Invalid username or password.", success: false});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if(!isPasswordMatch){
            return res.status(400).json({ message: "Invalid username or password.", success: false});
        }

        const tokenData = {
            userId : user._id
        };

        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY, {expiresIn:'1d'});

        return res.status(200).cookie("token",token,{maxAge : 1*24*60*60*1000, httpOnly:true,sameSite:'strict'}).json({
            _id : user._id,
            userName : user.userName,
            fullName : user.fullName,
            profilePhoto : user.profilePhoto,
            message: "Login successful.",
            success: true,
        });

    } catch (error) {
        console.log(error);
        
    }
}

export const logout = (req,res)=>{
    try {
        
        return res.status(200).cookie("token","",{maxAge : 0}).json({
            message:"logged out successfully"
        })

    } catch (error) {
        console.log(error);
        
    }
}


export const getOtherUsers = async (req,res) =>{
    try {
        
        const loggedInUserId = req.id;

        // {$ne:loggedInUserId} that means all the memberdetails send but not the loggedIn user details basiclly we filltering all the user but not return loggedIn user data. 
        // $ne means not equel to
        const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        return res.status(200).json({
            otherUsers:otherUsers,
            success:true
        })
    } catch (error) {
        
        console.log(error);
        
    }
}