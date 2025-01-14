import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { sendRegistrationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      pincode,
      schoolId,
    } = await req.json();

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !country ||
      !pincode ||
      !schoolId
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const schoolExists = await prisma.school.findUnique({
      where: { id: schoolId },
    });

    if (!schoolExists) {
      return NextResponse.json(
        { error: "School not found with the provided ID." },
        { status: 404 }
      );
    }

    const existingTransport = await prisma.transport.findFirst({
      where: {
        OR: [{ email }],
      },
    });

    if (existingTransport) {
      return NextResponse.json(
        {
          error: "A transporter with this email or phone already exists.",
        },
        { status: 400 }
      );
    }

    const tempPassword = randomBytes(8).toString("hex");

    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "transport",
        school: {
          connect: { id: schoolId },
        },
      },
    });

    await sendRegistrationEmail(email, tempPassword);

    const transport = await prisma.transport.create({
      data: {
        name,
        email,
        phone,
        address,
        city,
        state,
        country,
        pincode,
        school: {
          connect: { id: schoolId },
        },
        user: {
          connect: { id: user.id },
        },
      },
    });

    console.log("Transport Registered", transport);

    return NextResponse.json(
      { message: "Transport registered successfully", transport },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering transport:", error);

 
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
