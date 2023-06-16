import { NextResponse } from 'next/server';
import * as fs from 'fs';


export async function GET() {
  return NextResponse.json({ data: fs.readFileSync('/Users/zushun.chen/workspace/study/journey_crafter/src/app/api/mock_data/mock_journey.yaml', 'utf8') });
}
