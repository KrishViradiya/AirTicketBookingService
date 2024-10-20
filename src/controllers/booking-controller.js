const { BookingService } = require("../services")
const statusCodes = require('http-status-codes');
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController {

    async sendMessageToQueue(req,res) {
        const channel = await createChannel();
        const data = {message: "Success"};
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(200).json({
            message: "Successfully published the event"
        });
    }

    async create (req,res){
        try {
            console.log("Inside the booking controller");
            const response = await bookingService.createBooking(req.body);
            return res.status(statusCodes.OK).json({
                data:response,
                message:"Successfully booking completed",
                success:true,
                error:{}
            })
        } catch (error) {
            
            // console.log("From bokking controller", error);
            return res.status(500).json({
                data:{},
                message:error.message,
                success:false,
                err:error.explanation
            })
        }
    }
}


module.exports = BookingController