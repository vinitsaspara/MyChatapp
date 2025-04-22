import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { io, getReciverSocketId } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
    try {

        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
        }

        await gotConversation.save();


        // Implement socket.io
        const receiverSocketId = getReciverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(200).json({
            newMessage,
            success: true
        })

    } catch (error) {
        console.log(error);

    }
}



export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;

        // console.log("R: " ,receiverId, " S: ", senderId);

        // 🛠️ Await the query
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        // console.log(conversation);


        if (!conversation) {
            return res.status(200).json({
                message: "No conversation found",
                success: false
            });
        }

        res.status(200).json({
            message: "Messages retrieved successfully",
            success: true,
            messages: conversation.messages
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};
