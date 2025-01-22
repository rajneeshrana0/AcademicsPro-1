import cloudinary from "@/lib/cloudinary";

// Modify the return type to include both public_id and url
export async function uploadFile(file: File, folder: string): Promise<{ publicId: string, url: string }> {
  const byteArray = await file.arrayBuffer();
  const buffer = Buffer.from(byteArray);

  return new Promise<{ publicId: string, url: string }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(new Error("Failed to upload file to Cloudinary."));
        } else {
          // Construct URL from public ID
          const publicId = result?.public_id || "";
          const url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`;
          resolve({ publicId, url });
        }
      }
    );
    uploadStream.end(buffer);
  });
}
