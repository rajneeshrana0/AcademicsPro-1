import prisma from "@/db";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
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
        {
          error: "All fields are required.",
        },
        { status: 400 }
      );
    }

    const schoolExists = await prisma.school.findUnique({
      where: { id: schoolId },
    });

    if (!schoolExists) {
      return NextResponse.json(
        { error: "School not found with given ID" },
        { status: 404 }
      );
    }

    const existingAccount = await prisma.account.findFirst({
      where: {
        OR: [{ email }],
      },
    });

    if (existingAccount) {
      return NextResponse.json(
        { error: "An Account with this email already exists" },
        { status: 400 }
      );
    }

    const tempPassword = randomBytes(8).toString("hex");
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "account",
        school: {
          connect: {
            id: schoolId,
          },
        },
      },
    });

    await sendRegistrationEmail(email, tempPassword);

    const account = await prisma.account.create({
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
          connect: {
            id: schoolId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    console.log("Account Registered", account);

    return NextResponse.json(
      {
        message: "Account Registered Successfully",
        account,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("something Went Wrong ", error);

    return NextResponse.json(
      {
        error: "Something Went wrong please try again later",
      },
      { status: 500 }
    );
  }
}
