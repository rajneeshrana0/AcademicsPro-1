import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { sendRegistrationEmail } from "@/lib/email";



export async function POST(req: NextRequest) {

    try {

        const { name, email, phone, address, city, state, country, pincode, schoolId } = await req.json();


        if(!name || !email || !phone || !address || !city || !state || !country || !pincode || !schoolId) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const schoolExists = await prisma.school.findUnique({ where: { id: schoolId } });

        if(!schoolExists) {
            return NextResponse.json({ error: "School not found with the provided ID." }, { status: 404 });
        }   

        const existingHostel = await prisma.hostel.findFirst({ where: { OR: [{ email }] } });

        if(existingHostel) {
            return NextResponse.json({ error: "A hostel with this email or phone already exists." }, { status: 400 });
        }   
  const tempPassword = randomBytes(8).toString("hex");

    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = await prisma.user.create({

        data:{
            email,
            password: hashedPassword,
            role: "hostel",
            school:{
                connect: { id: schoolId }
            }
        }
    });

    await sendRegistrationEmail(email,tempPassword);


    const hostel = await prisma.hostel.create({
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
                connect: { id: user.id }
            },
            school: {
                connect: { id: schoolId }
        }
    }
    });
    console.log("Hostel registered successfully:", hostel);

    return NextResponse.json({ message: "Hostel registered successfully." , hostel}, { status: 200 });

        
    } catch (error) {
            console.error("Error registering Hostel:", error);
        
            if (error instanceof Error) {
              console.error("Error details:", error.stack);
            }
        
            return NextResponse.json(
              { error: "Something went wrong. Please try again later." },
              { status: 500 }
            );
          }
        
    }
