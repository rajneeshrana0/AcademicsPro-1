import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary"; // Import Cloudinary config

interface CloudinaryUploadResult {
  public_id: string;
  bytes: number;
  // duration: number;
  [key: string]: unknown;
}

export async function post(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = (formData.get("file") as File) || null;

    if (!file) {
      return NextResponse.json({
        error: "No file uploaded",
        status: 400,
      });
    }

    const byte = await file.arrayBuffer();

    const buffer = Buffer.from(byte);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "images" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as CloudinaryUploadResult);
            }
          }
        );
        uploadStream.end(buffer);
      }
    );

    return NextResponse.json({
      publicId: result.public_id,
      status: 200,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.log("image upload failed", error);

    return NextResponse.json({
      error: "Failed to upload image",
      status: 500,
    });
  }
}
