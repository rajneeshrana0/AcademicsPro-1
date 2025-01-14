import prisma from "@/db";
import { sendRegistrationEmail } from "@/lib/email";
import { randomBytes } from "crypto";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    try {

        const { name, email, phone, address, city, state, country, pincode, schoolId } = await req.json();
        if (!name || !email || !phone || !address || !city || !state || !country || !pincode || !schoolId) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const schoolExists = await prisma.school.findUnique({ where: { id: schoolId } });
        if (!schoolExists) {
            return NextResponse.json({ error: "School not found with the provided ID." }, { status: 404 });
        }


        const existingLibrary = await prisma.library.findFirst({ where: { OR: [{ email }, { phone }] } });
        if (existingLibrary) {
            return NextResponse.json({ error: "A library with this email or phone already exists." }, { status: 400 });
        }

        const rempPassword = randomBytes(8).toString("hex");
        const hashedPassword = await bcrypt.hash(rempPassword, 10);

        const user = await prisma.user.create({

            data:{
                email,
                password: hashedPassword,
                role: "library",
                school:{
                    connect: { id: schoolId },
                }
            }
        });

        await sendRegistrationEmail(email, rempPassword);

        const library = await prisma.library.create({
            data:{
                name,
                email,
                phone,
                address,
                city,
                state,
                country,
                pincode,
                school:{
                    connect: { id: schoolId },
                },
                user:{
                    connect: { id: user.id },
                },
            }
        });

        console.log("Library Registered Successfully",library);

        return NextResponse.json({
            status: 200,
            message: "Library Registered Successfully",
            data: library,
        });
        
    } catch (error) {
        console.log("Error in Registering Library",error);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
        
    }
}