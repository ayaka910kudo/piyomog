import { NextResponse } from "next/server";
import axios from "axios";

// バックエンドのベースURL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function GET() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/baby-foods`);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error fetching baby foods:", error);
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    return NextResponse.json(
      { error: "Failed to fetch baby foods" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.post(`${API_BASE_URL}/api/baby-foods`, body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error creating baby food:", error);
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: error.response.data.error || "Failed to create baby food" },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { error: "Failed to create baby food" },
      { status: 500 }
    );
  }
}
