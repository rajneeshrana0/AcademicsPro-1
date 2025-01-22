import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = (file: Express.Multer.File, folder: string) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder, // Dynamic folder based on user input
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url);
        }
      }
    ).end(file.buffer); // Send file buffer to Cloudinary
  });
