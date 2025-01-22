// app/api/upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary"; // Import Cloudinary config

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json({ error: "No image uploaded." }, { status: 400 });
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadResult: { secure_url: string } = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { public_id: `profile_${Date.now()}` }, // Unique public ID for the uploaded image
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            if (result) {
              resolve(result);
            } else {
              reject(new Error("Upload result is undefined"));
            }
          }
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ message: "Image uploaded successfully", url: uploadResult.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Failed to upload image." }, { status: 500 });
  }
}
