import { v2 as cloudinary } from "cloudinary";

import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadMedia = async (file) =>{
    try {
        const uploadResponse = await cloudinary.uploader.upload(file,{
            resource_type:"auto"
        });
        return uploadResponse;
    } catch (error) {
        console.log("Error in upload in cloudinary", error);
    }
}

export const deleteMediaFromCloudinary = async (publicId) =>{
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log("Error in delete in cloudinary", error);
    }
}

export const deleteVideoFromCloudinary = async (publicId) =>{
    try {
        await cloudinary.uploader.destroy(publicId,{resource_type:"video"});
    } catch (error) {
        console.log("Error in delete video in cloudinary", error);
    }
}
