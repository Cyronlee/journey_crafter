import { NextResponse } from "next/server";
import * as fs from "fs";
import path from "path";

export async function GET() {
  const currentDir = path.resolve("./src");
  return NextResponse.json({
    data: fs.readFileSync(
      `${currentDir}/app/api/mock_data/mock_journey.yaml`,
      "utf8"
    ),
  });
}
