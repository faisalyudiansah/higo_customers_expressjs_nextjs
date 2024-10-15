function errorHandlers(error, req, res, next) {
    let statusCode = 500;
    let message = `Internal Server Error`;

    switch (error.name) {
        case "BSONError":
            statusCode = 400;
            message = error.message;
            break;
    }

    res.status(statusCode).json({ message: message });
}

module.exports = { errorHandlers };