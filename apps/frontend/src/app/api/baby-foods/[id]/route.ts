import { NextResponse } from "next/server";
import axios from "axios";

// バックエンドのベースURL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const response = await axios.get(`${API_BASE_URL}/api/baby-foods/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching baby food:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
