import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { sendRegistrationEmail } from "@/lib/email";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server"; // Import NextResponse

export async function POST(req: NextRequest) {
  const { email, role, createdBy } = await req.json(); // Parsing JSON from the request body


  if (!email || !role || !createdBy) {
    return NextResponse.json({ message: "Email, role, and createdBy are required" }, { status: 400 });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
  }

  try {
  
    const creator = await prisma.user.findUnique({ where: { email: createdBy } });
    if (!creator) {
      return NextResponse.json({ message: "Creator not found" }, { status: 404 });
    }

    // Super Admin can register the Admins
    if (role === "ADMIN" && creator.role !== "SUPER_ADMIN") {
      return NextResponse.json({ message: "Only Super Admin can register Admins" }, { status: 403 });
    }

    //  only Admin and Super Admin can register other roles
    if (
      role !== "ADMIN" &&
      role !== "SUPER_ADMIN" &&
      creator.role !== "ADMIN" &&
      creator.role !== "SUPER_ADMIN"
    ) {
      return NextResponse.json({ message: "You are not authorized to register this role" }, { status: 403 });
    }

    // Generate a temporary password and hash it
    const tempPassword = randomBytes(8).toString("hex");
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Log the user creation attempt
    console.log("Registering user with email:", email, "Role:", role);

    // Register the new user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });

    console.log("User created successfully:", user);

    await sendRegistrationEmail(email, tempPassword);

    return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
