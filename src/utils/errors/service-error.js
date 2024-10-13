const statusCodes = require("http-status-codes");

class ServiceError extends Error {
  constructor(
        message = 'Something went Wrong',
        explanation = 'Service Layer Error',
        statusCode = statusCodes.INTERNAL_SERVER_ERROR
    ) {
        super();
        this.name = 'Service Error',
        this.message = message,
        this.explanation = explanation,
        this.statusCode = statusCodes
    }
}

module.exports = ServiceError;
