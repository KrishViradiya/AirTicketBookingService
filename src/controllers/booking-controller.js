const { BookingService } = require("../services")
const statusCodes = require('http-status-codes')

const bookingService = new BookingService();

const create = async (req,res) => {
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

module.exports = {
    create
}