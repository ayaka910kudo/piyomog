import { NextResponse } from "next/server";
import axios from "axios";

// バックエンドのベースURL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function GET() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/baby-foods`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching baby foods:", error);
    return NextResponse.json(
      { error: "Failed to fetch baby foods" },
      { status: 500 }
    );
  }
}
