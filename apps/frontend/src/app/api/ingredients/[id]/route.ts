import { NextResponse } from "next/server";
import axios from "axios";

// バックエンドのベースURL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// 削除
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const response = await axios.delete(
      `${API_BASE_URL}/api/ingredients/${id}`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    return NextResponse.json(
      { error: "Failed to delete ingredient" },
      { status: 500 }
    );
  }
}
