export const errorHandler = (statusCode, message)=>{
    const error= new Error()
    error.statusCode = statusCode
    error.message = message
    return error
} 

export const ErrorMiddleware = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    res.status(statusCode).json({
            success : false,
            statusCode,
            message,
    })
}