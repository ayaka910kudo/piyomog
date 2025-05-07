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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received request body:", body);

    // バリデーション
    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // バックエンドに送信するデータの形式を整える
    const requestData = {
      name: body.name,
      reactionStars: body.reactionStars || 0,
      memo: body.memo || "",
      ingredientIds: body.ingredientIds || [], // バックエンドが期待する形式に合わせる
    };

    console.log("Sending to backend:", requestData);

    const response = await axios.post(
      `${API_BASE_URL}/api/baby-foods`,
      requestData
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error creating baby food:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Backend error response:", error.response.data);
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
