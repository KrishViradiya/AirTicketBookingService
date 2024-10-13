const { Booking } = require("../models/index");
const { ValidationError, AppError } = require("../utils/errors/index");
const statusCodes = require("http-status-codes");

class BookingRepository {
  async create(data) {
    try {
        const booking = await Booking.create(data);
        return booking
    } catch (error) {
      if (error.name == "SequelilzeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "RepositroyError",
        "cannot create booking",
        "there was some issue creating the booking, please try again later",
        statusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
