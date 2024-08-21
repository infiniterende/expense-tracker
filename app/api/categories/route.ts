// app/api/route.js 👈🏽

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
// To handle a POST request to /api
export async function GET(request: NextRequest) {
  request.headers.set("Access-Control-Allow-Origin", "*");
  request.headers.set("Access-Control-Allow-Methods", "GET");
  request.headers.set("Access-Control-Allow-Headers", "Content-Type");
  const categories = await prisma.category.findMany();
  console.log(categories);
  return NextResponse.json({ categories });
}

// export async function POST(request: NextRequest) {
//   // Do whatever you want
//   request.headers.set("Access-Control-Allow-Origin", "*");
//   request.headers.set("Access-Control-Allow-Methods", "POST");
//   request.headers.set("Access-Control-Allow-Headers", "Content-Type");
//   const body = await request.json();
//   console.log(body);

//   const { vendor, description, amount, date, categoryId } = body;

//   const newExpense = await prisma.expense.create({
//     data: {
//       vendor,
//       description,
//       amount,
//       date,
//       categoryId,
//     },
//   });
//   return NextResponse.json(newExpense, { status: 200 });
// }

// // Same logic to add a `PATCH`, `DELETE`...
