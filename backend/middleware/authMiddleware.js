import jwt from "jsonwebtoken";
export const isLoggedIn = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        const error = new Error("You are not authorised");
        error.statusCode = 401;
        return next(error);
    }
    try{
    const decoded =  jwt.verify(token,process.env.JWT_SECRET);
     req.user = decoded.userId;
     return next();
    }catch(error){
      error.statusCode = 401;
      next(error);
    }
    
};