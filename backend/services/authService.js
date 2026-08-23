import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUserService = async(name,email,password) => {
    email = email.trim().toLowerCase();
  const existingUser = await User.findOne({email});
  if(existingUser){
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(password,10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return newUser;
}

export const loginUserService = async(email,password) => {
    email = email.trim().toLowerCase();
    const loggedInUser = await User.findOne({email});
    if(!loggedInUser){
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
    const isValidPassword = await bcrypt.compare(password,loggedInUser.password);
    if(!isValidPassword){
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
    const token = jwt.sign(
        {userId:loggedInUser._id},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    );
    return {
     token
    };
}