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

        const existingStudent = await prisma.student.findFirst({
            where: {
                OR: [{ email }],
            },
        });

        if (existingStudent) {
            return NextResponse.json(
                {
                    error: "A student with this email or phone already exists.",
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
                role: "student",
                school: {
                    connect: { id: schoolId },
                },
            },
        });


        await sendRegistrationEmail(email, tempPassword);


        const student = await prisma.student.create({
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

        console.log("Student Registered", student);

        return NextResponse.json(
            { message: "Student registered successfully", student },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error registering student:", error);


        if (error instanceof Error) {
            console.error("Error details:", error.stack);
        }

        return NextResponse.json(
            { error: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}
