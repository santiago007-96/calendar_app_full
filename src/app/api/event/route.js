import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function POST(request) {
  try {
    const data = await request.json();
    const newEvent = await db.event.create({
      data,
    });
    return NextResponse.json(newEvent);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const events = await db.event.findMany({});

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
