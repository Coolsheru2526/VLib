import { catchAsyncErrors } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";


export const userRegister = catchAsyncErrors(async (req,res,next) =>{
    const{
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        enrollmentNumber,
    }=req.body;
    if( !firstName||
        !lastName||
        !email||
        !phone||
        !password||
        !gender||
        !dob||
        !enrollmentNumber){
            return next(new ErrorHandler("Please fill full form",400));
        }
    let user =await User.findOne({email});
    if(user){
        return next(new ErrorHandler("Email already exists",400));
    }
    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        enrollmentNumber,
        role: "Student"
    });
    generateToken(user,"User Registered",200,res);
});
export const login = catchAsyncErrors(async (req,res,next) =>{
    const {email,password,role} = req.body;
    if(!email||!password||!role){
        return next(new ErrorHandler("Please fill full form",400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",400));
    }
    if(role!==user.role){
        return next(new ErrorHandler("User With this role not found",400));
    }
    generateToken(user,"Login Successful",200,res);
});

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res
      .status(201)
      .cookie("studentToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "User Logged Out Successfully.",
      });
  });

export const logoutAdmin = catchAsyncErrors(async (req, res, next)=>{
    res
      .status(201)
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "User Logged Out Successfully.",
      });
});
