import { NextResponse, NextRequest } from "next/server";

export const QUERY_PROP_NAME = "query";

export async function GET(request: NextRequest) {

  const queryParams = request.nextUrl.searchParams;

  const queryText = queryParams.get(QUERY_PROP_NAME);

  if(!queryText?.length) {
    return NextResponse.error();
  }

  return NextResponse.json(queryText)
}