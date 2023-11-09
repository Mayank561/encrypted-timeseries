const errorHandlerModule = require("../utils/eHandler");

const eHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (err.name == 'castError') {
        error = new errorHandlerModule(`Not Found are id ${err.value}`, 400);
    }

    if (err.code == 11000) {
        error = new errorHandlerModule(`Duplicate Fields`, 400);
    }

    if (err.name == "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new errorHandlerModule(`${message}`, 400);
    }

    console.log(err.message);

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "server Error",
    });
};

module.exports = eHandler;
