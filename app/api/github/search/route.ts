import { searchRepos } from "@/app/github-api";
import { NextResponse, NextRequest } from "next/server";

const QUERY_PROP_NAME = "query";
export async function GET(request: NextRequest) {

  const queryParams = request.nextUrl.searchParams;

  const queryText = queryParams.get(QUERY_PROP_NAME);

  if(!queryText?.length) {
    return NextResponse.error();
  }

  const result = await searchRepos(queryText);

  return NextResponse.json(result)
}