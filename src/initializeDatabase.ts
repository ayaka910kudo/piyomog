import * as sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database | null = null;

export async function initializeDatabase(): Promise<Database> {
  try {
    db = await open({
      filename: "./db/piyomog.db",
      driver: sqlite3.Database,
    });
    console.log("データベース接続が確立されました");
    return db;
  } catch (error) {
    console.error("データベース接続エラー:", error);
    throw error;
  }
}

// db接続するための情報
export function getDatabase(): Database {
  if (!db) {
    throw new Error("データベースが初期化されていません");
  }
  return db;
}
