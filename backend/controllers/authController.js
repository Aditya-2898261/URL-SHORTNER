import {
    registerUserService,
    loginUserService,
    getCurrentUserService
} from "../services/authService.js";

export const registerUser = async(req,res) => {
    const {name, email, password} = req.body;

    const  user = await registerUserService(name,email,password);

    res.status(201).json({
        message: "User registered successfully",
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
        },
    });
};

export const loginUser = async(req,res) => {
    const {email,password} = req.body;
    const {token, user} = await loginUserService(email,password);
    res.cookie("token",token,
        {
            httpOnly:true,
            secure:false,
            sameSite:'strict'
        }
    );
    res.status(200).json({
        message:"Login Successful",
        user
    });
};

export const getCurrentUser = async(req,res) => {
    const user = await getCurrentUserService(req.user);
    res.status(200).json({
        user
    });
};

export const logoutUser = async (req,res) => {
    res.clearCookie("token",{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
    });
    res.status(200).json({
        message: "Logout Successful",
    });
};


