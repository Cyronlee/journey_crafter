import { NextResponse } from "next/server";
import * as fs from "fs";
import path from "path";

export async function GET() {
  const currentDir = path.resolve("./src");
  return NextResponse.json({
    data: fs.readFileSync(`${currentDir}/data/journey2.yaml`, "utf8"),
  });
}
