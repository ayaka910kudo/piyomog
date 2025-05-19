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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // リクエストボディを取得
    const body = await request.json();
    const { name, reactionStars, memo, ingredientIds } = body;

    // バックエンドAPIにPATCHリクエストを送信
    const response = await axios.patch(`${API_BASE_URL}/api/baby-foods/${id}`, {
      name,
      reactionStars,
      memo,
      ingredientIds,
    });

    // バックエンドのステータスコードを転送
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error updating baby food:", error);

    if (axios.isAxiosError(error) && error.response) {
      // エラー時のステータスコードも転送
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("DELETE request received with params:", params);
    const { id } = params;

    if (!id) {
      console.log("Error: ID is missing");
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    console.log(`Attempting to delete baby food with ID: ${id}`);
    const response = await axios.delete(`${API_BASE_URL}/api/baby-foods/${id}`);
    console.log("Delete response:", response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error deleting baby food:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
