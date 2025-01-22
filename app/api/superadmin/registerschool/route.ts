import { NextRequest,NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: NextRequest) {  

const { name, phone,address,city,state,country,pincode} = await req.json(); 
const school = await prisma.school.create({
  data: {
    name,
    phone,
    address,
    city,
    state,
    country,
    pincode
  }
    
});
console.log(school);
return NextResponse.json({ message: "School registered successfully" }, { status: 200 });

}

// get all schools

export async function GET( ) {
  const schools = await prisma.school.findMany();
  return NextResponse.json(schools, { status: 200 });
}


// Get school by ID (GET route with schoolId)
export async function GET_BY_ID(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const schoolId = searchParams.get("id");

  if (!schoolId) {
    return NextResponse.json({ message: "School ID is required" }, { status: 400 });
  }

  const school = await prisma.school.findUnique({
    where: {
      id: schoolId,
    },
  });

  if (!school) {
    return NextResponse.json({ message: "School not found" }, { status: 404 });
  }

  return NextResponse.json(school, { status: 200 });
}