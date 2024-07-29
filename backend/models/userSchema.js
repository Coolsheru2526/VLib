import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"Should gave atleast 3 characters"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Should gave atleast 3 characters"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Should have atleast 10 characters"],
        maxLength:[10,"Should have atleast 10 characters"]
    },
    enrollmentNumber:{
        type:String,
        required:true,
        minLength:[13,"Should have atleast 13 characters"],
        maxLength:[13,"Should have atleast 13 characters"]
    },
    dob:{
        type:Date,
        required:[true,"DOB is neccessary"]
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"]
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"Should have atleast 6 characters"],
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Student"]
    },
    booksBorrowed:[{booksId:{type:mongoose.Schema.Types.ObjectId, ref: "Book"},date:{type:Date,default:Date.now()}}]
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.generateJsonWebToken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES});
}


export const User = mongoose.model("User",userSchema);