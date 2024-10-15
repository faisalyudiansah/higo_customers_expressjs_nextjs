const { ISO, INVALID_QUERY } = require("../constants/errorConstants");

function errorHandlers(error, req, res, next) {
    let statusCode = 500;
    let message = ISO;

    switch (error.name) {
        case INVALID_QUERY:
            statusCode = 400;
            message = INVALID_QUERY;
            break;
        case "BSONError":
            statusCode = 400;
            message = error.message;
            break;
    }

    res.status(statusCode).json({ message: message });
}

module.exports = { errorHandlers };