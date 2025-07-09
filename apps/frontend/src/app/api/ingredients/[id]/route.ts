import { NextResponse } from "next/server";
import axios from "axios";

// バックエンドのベースURL（サーバーサイド用）
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001";

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined");
}

// 更新
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const response = await axios.patch(
      `${API_BASE_URL}/api/ingredients/${id}`,
      body
    );
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error updating ingredient:", error);
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    return NextResponse.json(
      { error: "Failed to update ingredient" },
      { status: 500 }
    );
  }
}

// 削除
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const response = await axios.delete(
      `${API_BASE_URL}/api/ingredients/${id}`
    );
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    if (axios.isAxiosError(error) && error.response) {
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
