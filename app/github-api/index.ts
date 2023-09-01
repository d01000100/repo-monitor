import { Octokit } from "octokit";
import { CommitActivity, Repo } from "../model/reposSlice";
import lodash from "lodash";

const TOKEN = "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";

export interface RepoInfo {
  id: number,
  name: string,
  full_name: string,
  owner: {
    login: string
  } | null
}

export interface SearchResult {
  total_count: number,
  incomplete_results: boolean,
  items: RepoInfo[]
}

export async function searchRepos(query: string): Promise<Repo[]> {
  const octokit = new Octokit({
    auth: TOKEN
  })

  const result = await octokit.request('GET /search/repositories', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
    q: query
  })
  // TODO: Error handling
  return result.data.items.slice(0,6).map(repoData => {
    const { id, name: repo_name, stargazers_count, updated_at, owner } = repoData;
    const owner_name = owner!.login;

    return {
      id,
      name: repo_name,
      stars: stargazers_count,
      updatedAt: updated_at,
      owner: owner_name
    }
  })

}

export async function getCommitHistory({ owner, name }: { owner: string, name: string }) {
  const octokit = new Octokit({
    auth: TOKEN
  })

  const result = await octokit.request('GET /repos/{owner}/{repo}/stats/commit_activity', {
    owner,
    repo: name,
  })

  if (!Array.isArray(result.data)) {
    // TODO: Error handling
    return;
  }

  return result.data.map(c => lodash.pick(c, "total", "week"))
}