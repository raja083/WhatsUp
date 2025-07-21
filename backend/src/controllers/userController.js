import { generateToken } from "../utils/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { deleteMediaFromCloudinary, uploadMedia } from "../lib/cloudinary.js";
import fs from "fs/promises"
//controller to sign up user
export const signup = async (req, res) => {
  
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    await await generateToken(res,user,`Welcome back ${user.fullName}`)
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
        const userId = req.id;
        const {fullName} = req.body; //get name from req.body
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if(!user){
            res.status(400).json({
                message:"User not found",
                success:"false"
            })
        }

        //to update profile photo we need to delete the previous one
        //extract publicId of the old image from the url if it exists 
        //for every image or video uploaded on cloudinary , it has a unique public id

        if(user.profilePic){
            const publicId = user.profilePic.split("/").pop().split(".")[0];  //extract public id from the string of photo url
            deleteMediaFromCloudinary(publicId);
        }

        // now upload the new photo or(update)
        const cloudinaryResponse = await uploadMedia(profilePhoto.path);

        const profilePic = cloudinaryResponse.secure_url;

        await fs.unlink(profilePhoto.path); //remove the uploaded file from uploads folder once uploaded to cloudinary
        const updatedData = {fullName,profilePic};

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData,{new:true}).select("-password")

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Peofile updated successfully"
        })

    } catch (error) {
        console.log("Error in updateProfile controller",error);
        return res.status(500).json({
            success:false,
            message:"Failed to update profile"
        })
    }
};

export const getLoggedInUser =async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    return res.status(200).json({
      user,
      message:"User fetched successfully",
      success:true
    })
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};