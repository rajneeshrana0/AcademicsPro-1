import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { sendRegistrationEmail } from "@/lib/email";
import { uploadImageToCloudinary } from "@/lib/cloudinary"; 
import { Readable } from "stream";

export async function POST(req: NextRequest) {
  try {
    console.log("Starting request...");

   
    const formData = await req.formData();
    console.log("Form data received:", formData);

    const profilePic = formData.get("profilePic");
    console.log("Profile picture received:", profilePic);

    if (profilePic && profilePic instanceof Blob) {
      console.log("Profile picture is valid");

     
      const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validImageTypes.includes(profilePic.type)) {
        console.error("Invalid image format:", profilePic.type);
        return NextResponse.json(
          { error: "Invalid image format. Only JPEG, JPG, or PNG are allowed." },
          { status: 400 }
        );
      }
      console.log("Valid image format");

     
      const fileBuffer = await profilePic.arrayBuffer(); 
      console.log("Profile picture buffer created. Size:", fileBuffer.byteLength);

  
      const file: Express.Multer.File = {
        fieldname: "profilePic",
        originalname: profilePic.name,
        encoding: "7bit",
        mimetype: profilePic.type,
        buffer: Buffer.from(fileBuffer),
        size: fileBuffer.byteLength,
        stream: new Readable(),
        destination: "",
        filename: "",
        path: "",
      };

      console.log("File prepared for Cloudinary:", file);

      // Upload image to Cloudinary
      const folderName = "profile_pics"; // Specify the folder name
      const imageUrl = await uploadImageToCloudinary(file, folderName).catch((error) => {
        console.error("Cloudinary upload error:", error);
        throw new Error("Cloudinary upload failed");
      });
      console.log("Image uploaded to Cloudinary. URL:", imageUrl);

      // Extract other form data (assuming JSON string)
      const data = formData.get("data");
      if (!data) {
        console.error("Missing form data.");
        return NextResponse.json({ error: "Form data is missing." }, { status: 400 });
      }

      const { name, email, phone, address, city, state, country, pincode, schoolId } = JSON.parse(data as string);
      console.log("Parsed form data:", { name, email, phone, address, city, state, country, pincode, schoolId });

      // Field validation
      if (!name || !email || !phone || !address || !city || !state || !country || !pincode || !schoolId) {
        console.error("Validation failed. Missing required fields.");
        return NextResponse.json({ error: "All fields are required." }, { status: 400 });
      }

      // Check if school exists
      const schoolExists = await prisma.school.findUnique({
        where: { id: schoolId },
      });
      console.log("School found:", schoolExists);

      if (!schoolExists) {
        console.error("School not found with the provided ID.");
        return NextResponse.json({ error: "School not found with the provided ID." }, { status: 404 });
      }

      // Check for existing user
      const existingStudent = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }],
        },
      });
      console.log("Existing student found:", existingStudent);

      if (existingStudent) {
        console.error("A student with this email or phone already exists.");
        return NextResponse.json(
          { error: "A student with this email or phone already exists." },
          { status: 400 }
        );
      }

      // Generate a temporary password
      const tempPassword = randomBytes(8).toString("hex");
      console.log("Temporary password generated:", tempPassword);

      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      console.log("Password hashed");

      // Create user with profile picture URL from Cloudinary
      const user = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          address,
          city,
          state,
          country,
          pincode,
          
          profilePic: imageUrl, // Save the Cloudinary URL
          password: hashedPassword,
          role: "student",
          school: {
            connect: { id: schoolId },
          },
        },
      });
      console.log("User created:", user);

      // Send registration email with temporary password
      await sendRegistrationEmail(email, tempPassword);
      console.log("Registration email sent to:", email);

      // Create student record
      const student = await prisma.student.create({
        data: {
          school: {
            connect: { id: schoolId },
          },
          user: {
            connect: { id: user.id },
          },
        },
      });
      console.log("Student record created:", student);

      // Return success response
      return NextResponse.json({ message: "Student registered successfully", student }, { status: 200 });

    } else {
      console.error("No profile picture received.");
      return NextResponse.json({ error: "Profile picture is required." }, { status: 400 });
    }

  } catch (error) {
    console.error("Error registering student:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.stack);
    }
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
