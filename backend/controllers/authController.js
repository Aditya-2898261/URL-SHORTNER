import {registerUserService,loginUserService} from "../services/authService.js";

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
    const {token,user} = await loginUserService(email,password);
    res.cookie("token",token,
        {
            httpOnly:true,
            secure:false,
            sameSite:'strict'
        }
    );
    res.status(200).json({
        message:"Login Successfull"
    });
}

export const testAuth = (req, res) => {
    res.status(200).json({
        message: "You are authenticated",
        userId: req.user,
    });
};