import prisma from "@/db";
import { sendRegistrationEmail } from "@/lib/email";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

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

    const existingParent = await prisma.parent.findFirst({
      where: {
        OR: [{ email }],
      },
    });

    if (existingParent) {
      return NextResponse.json(
        {
          error: "A parent with this email or phone already exists.",
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
        role: "parent",
        school: {
          connect: { id: schoolId },
        },
      },
    });

    await sendRegistrationEmail(email, tempPassword);

    const parent = await prisma.parent.create({
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

    console.log("Parent Registered Successfully", parent);

    return NextResponse.json({
      status: 200,
      message: "Parent Registered Successfully",
      data: parent,
    });
  } catch (error) {
    console.error("Error registering parent:", error);

    if (error instanceof Error) {
      console.error("Error details:", error.stack);
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
