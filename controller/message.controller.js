import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.model.js"
import { getReciverSoketId, io } from "../socket.js";

export const sendmessage = async (req, res) => {
    try {
        const senderId = req.id
        const reciverId = req.params.id
        const { message } = req.body

        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        });

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, reciverId]
            })
        };

        const newmessage = await Message.create({
            senderId, reciverId, message
        });

        if (newmessage) {
            gotConversation.messages.push(newmessage._id);
        }

        // await gotConversation.save();
        // await newmessage.save();

        await Promise.all([gotConversation.save(), newmessage.save()])

        // soket IO

        const reciverSocketId = getReciverSoketId(reciverId);

        if (reciverSocketId) {
            io.to(reciverSocketId).emit('newMessage', newmessage);
            io.emit('notification',newmessage);
        }

        return res.status(200).json({
            newmessage
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: false,
            msg: "Bad request"
        })
    }
}

export const getmessage = async (req, res) => {
    try {
        const reciverId = req.params.id
        const senderId = req.id
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        }).populate('messages');
        res.status(200).json(conversation?.messages)
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: false,
            msg: err.message ||  "Bad request"
        })
    }
}