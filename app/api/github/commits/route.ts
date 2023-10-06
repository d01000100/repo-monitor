import { getCommitHistory, searchRepos } from "@/app/github-api";
import { NextResponse, NextRequest } from "next/server";

export const OWNER_PROP_NAME = "owner";
export const NAME_PROP_NAME = "name";

export async function GET(request: NextRequest) {

  const queryParams = request.nextUrl.searchParams;

  const owner = queryParams.get(OWNER_PROP_NAME);
  const name = queryParams.get(NAME_PROP_NAME);

  if(!owner?.length || !name?.length) {
    return NextResponse.error();
  }

  const result = await getCommitHistory({owner, name});

  return NextResponse.json(result)
}