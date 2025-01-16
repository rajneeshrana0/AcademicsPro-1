import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
//   const CLOUDINARY_URL = process.env.CLOUDINARY_URL as string; // Cloudinary URL
  const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
  const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string;
  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME as string;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;
    const folder = formData.get('folder') as string; // Get folder name from the form data

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    if (!folder) {
      return NextResponse.json({ error: 'Folder name is required' }, { status: 400 });
    }

    const base64File = await fileToBase64(file);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          file: base64File,
          folder, // Upload to a specific folder
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET as string, // Optional preset
        }),
      }
    );

    if (!uploadResponse.ok) {
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }

    const data = await uploadResponse.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function fileToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsDataURL(file);
  });
}
