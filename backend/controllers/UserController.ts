import jwt from "jsonwebtoken";
import UserModel from "../models/user";
import { Request, Response } from "express";





export  const userSignup = async (req: Request, res: Response) => {
    // Zod Validation && Password Hashing
  
    const username = req.body.username;
    const password = req.body.password;
  
    console.log(req.body);
  
    try {
      await UserModel.create({
        username,
        password,
      });
  
      res.status(200).json({
        message: "User created successfully",
        data: req.body,
      });
    } catch {
      res.status(411).json({
        message: "User already exists",
        data: req.body,
      });
    }
  };
  




export const userLogin = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({ username, password });

    if (existingUser) {
      const token = jwt.sign(
        { id: existingUser._id },
        process.env.JWT_SECRET as string 
      );

      res.status(200).json({
        message: "User logged in successfully",
        data: { 
          userId: existingUser._id, 
          username: existingUser.username 
          // Include only necessary user data for security
        },
        token,
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials", // More accurate message
        data: null, // Don't send back user input on failure
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ 
      message: "Internal server error", 
      data: null 
    }); // Use 500 for server errors
  }
};

// module.exports = { userLogin , userSignup}; 





