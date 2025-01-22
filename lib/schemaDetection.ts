import prisma from "@/db";
import { NextRequest } from "next/server";

export async function detectSchemaType(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    throw new Error("ID is required to detect schema type");
  }

  // Try detecting the schema type by checking the ID in each table
  if (await prisma.student.findUnique({ where: { id } })) {
    return "student";
  }
  if (await prisma.teacher.findUnique({ where: { id } })) {
    return "teacher";
  }
  if (await prisma.parent.findUnique({ where: { id } })) {
    return "parent";
  }
  // Add additional schema checks here as needed

  throw new Error("Unable to detect schema type for the provided ID");
}
