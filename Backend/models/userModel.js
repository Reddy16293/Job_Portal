import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema=new mongoose.Schema({
      name:{
        type:String,
        required:[true,"Please Provide Your Name"],
        minLength:[3,"name contain at least 3 characters"],
        maxLength:[30,"name cannot excees  30 characters"]
      },
      email:{
        type:String,
        required:[true,"Please Provide Your email"],
        validate:[validator.isEmail,"Please provide a valid email"],
      },
      phone:{
        type:Number,
        required:[true,"Please provide Your Phone Number"],

      },
      password:{
        type:String,
        required:[true,"Please Provide Your Password"],
        minLength:[8,"password must contain at least 8 characters"],
        maxLength:[30,"password cannot exceed 30 characters"]
      },
      role:{
        type:String,
        required:[true,"Please provide your role"],
        enum:["Job Seeker","Employer"]
      },
      createdAt:{
        type:Date,
        default:Date.now(),
      }

});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);

});

userSchema.methods.comparePassword=async  function(enterPasword){
    return await bcrypt.compare(enterPasword,this.password);
};

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
}

export const User=mongoose.model("User",userSchema);

