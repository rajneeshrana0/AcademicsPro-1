import prisma from "@/db";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendRegistrationEmail } from "@/lib/email";

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

    const existingTeacher = await prisma.teacher.findFirst({ 
        where: {
             OR: [{ email }],
        },
            });

    if (existingTeacher) { 
        return NextResponse.json({ error: "A teacher with this email or phone already exists." }, { status: 400 });
    }

    const tempPassword = randomBytes(8).toString("hex");
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = await prisma.user.create({
        data:{
            email,
            password: hashedPassword,
            role: "teacher",
            school:{
                connect: { id: schoolId },
            },
        },
    });

   await sendRegistrationEmail(email,tempPassword);

    const teacher = await prisma.teacher.create({ 
        data: {
            name,
            email,
            phone,
            address,
            city,
            state,
            country,
            pincode,
            user: {
                connect: { id: user.id },
            },
            school: {
                connect: { id: schoolId },
            },
        },
    });
    console.log("Teacher created successfully", teacher);
    return NextResponse.json({ message: "Teacher created successfully",teacher },
    { status: 200 }
    );
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong.Please Try Again" }, { status: 500 });
    
  }


 
}
