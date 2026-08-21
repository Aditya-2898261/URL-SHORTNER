export const errorHandler = (err, req, res, next) => {
    console.log(err);

    const {statusCode = 500, message = "Internal server error"} = err;

    res.status(statusCode).json({
        message,
    });
};