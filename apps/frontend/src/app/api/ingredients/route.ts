import { NextResponse } from "next/server";
import axios from "axios";

// バックエンドのベースURL（サーバーサイド用）
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001";

export async function GET() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/ingredients`);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    return NextResponse.json(
      { error: "Failed to fetch ingredients" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
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
      { error: "Failed to delete ingredient" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    if (!body) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 }
      );
    }
    const { name } = JSON.parse(body);
    const response = await axios.post(`${API_BASE_URL}/api/ingredients`, {
      name,
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error creating ingredient:", error);
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: error.response.data.error || "Failed to create ingredient" },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { error: "Failed to create ingredient" },
      { status: 500 }
    );
  }
}
