import jwt  from "jsonwebtoken";

const isAuthenticated = async (req,res,next)=>{
    try {
        
        const token = req.cookies.token;

        // console.log(token);

        if(!token){
            return res.status(401).json({error:"Unauthorized",success:false});
        }

        const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!decode){
            return res.status(401).json({error:"Error In authenticated middlewar",success:false});
        }

        // console.log(decode);
        

        req.id = decode.userId;

        next();
        
    } catch (error) {
        console.log("Error in isauthenticated middleware");
    }
}

export default isAuthenticated