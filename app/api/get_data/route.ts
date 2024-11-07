import { NextResponse } from "next/server";
import { data } from "@/app/api/database";

// Định nghĩa hàm xử lý request GET
export async function GET() {
  return NextResponse.json(data);
}
