import { catchAsyncErrors } from "../middlewares/catchAyncError.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/error.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!", 400));
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  res.status(200).json({
    success: true,
    message: "User registered successfully!",
    user,
  });
});
