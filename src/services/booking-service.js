const { FLIGHT_REQUEST_PATH } = require("../config/serverConfig");
const { BookingRepository } = require("../repository/index");
const axios = require('axios');
const { ServiceError } = require("../utils/errors");

class BookingService {
    constructor(){
        this.bookingRepository = new BookingRepository();

    }

    async createBooking(data) {
        try {
            
            const flightId = data.flightId
            let flightRequestUrl = `${FLIGHT_REQUEST_PATH}/api/v1/flight/${flightId}`
           
            const response = await axios.get(flightRequestUrl)
            const flightData = response.data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.totalCost){
                throw new ServiceError('something went wrong in the booking process', 'Insufficient seats in the flight');

            }

            //calculating the total cost
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = {...data,totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFlightRequestUrl = `${FLIGHT_REQUEST_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestUrl, {totalSeats: flightData.totalSeats  - booking.noOfSeats});
            // console.log("remaining seats" , totalSeats)
            const finalBooking = await this.bookingRepository.update(booking.id,{status:"Booked"});
            return finalBooking;
            return booking;
        } catch (error) {
            console.error(error)
            if(error.name == 'RepositroyError' || error.name == 'ValidationError'){
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService;