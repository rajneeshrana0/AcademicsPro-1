import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { sendRegistrationEmail } from "@/lib/email";


export async function POST(req: NextRequest) {
  try {
    console.log("Starting request...");


      const { name, email, phone, address, city, state, country, pincode, schoolId } = await req.json();
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
          OR: [{ email }],
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

   

  } catch (error) {
    console.error("Error registering student:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.stack);
    }
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
