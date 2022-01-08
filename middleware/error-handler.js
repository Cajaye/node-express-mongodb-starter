const { CustomAPIError } = require('../errors/index')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER,
        msg: err.message || 'Something went wrong please try again later'
    }
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
        customError.statusCode = StatusCodes.BAD_REQUEST;

    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate for ${Object.keys(err.keyValue)} field`
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware