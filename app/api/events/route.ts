import { NextResponse } from "next/server";
import prisma from "@/db";


export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: {
      startDate: 'asc'
    }
  });
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const json = await request.json();
  const event = await prisma.event.create({
    data: {
      title: json.title,
      description: json.description,
      startDate: new Date(json.startDate),
      endDate: new Date(json.endDate),
    },
  });

  return NextResponse.json(event);
}