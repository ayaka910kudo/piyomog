import { NextResponse } from "next/server";
import axios from "axios";

// バックエンドのベースURL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function GET() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/ingredients`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return NextResponse.json(
      { error: "Failed to fetch ingredients" },
      { status: 500 }
    );
  }
}
