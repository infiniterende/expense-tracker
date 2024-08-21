// app/api/route.js 👈🏽

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
// To handle a POST request to /api
export async function GET(request: NextRequest) {
  request.headers.set("Access-Control-Allow-Origin", "*");
  request.headers.set("Access-Control-Allow-Origin", "https://sulmanlab.org");
  request.headers.set("Access-Control-Allow-Methods", "GET");
  request.headers.set("Access-Control-Allow-Headers", "Content-Type");
  const expenses = await prisma.expense.findMany();
  return NextResponse.json({ expenses });
}

export async function POST(request: NextRequest) {
  // Do whatever you want
  request.headers.set("Access-Control-Allow-Origin", "*");
  request.headers.set("Access-Control-Allow-Methods", "POST");
  request.headers.set("Access-Control-Allow-Headers", "Content-Type");
  const body = await request.json();
  console.log(body);

  const { vendor, description, amount, date, categoryId } = body;

  const parsedAmount = parseFloat(amount);
  const convertedDate = new Date(date);
  const newExpense = await prisma.expense.create({
    data: {
      vendor,
      description,
      amount: parsedAmount,
      date: convertedDate,
      categoryId,
    },
  });

  return NextResponse.json(newExpense, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
