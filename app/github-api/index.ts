import { Octokit } from "octokit";
import { Repo } from "../model/reposSlice";

const octokit = new Octokit({
  auth: "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"
})

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
  const result = await octokit.request('GET /repos/{owner}/{repo}/stats/commit_activity', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
    owner,
    repo: name,
  })
  return result.data
}