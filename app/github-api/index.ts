import { Octokit } from "octokit";

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

export async function searchRepos() : Promise<SearchResult> {
    const result = await octokit.request('GET /search/repositories', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        q: "pokemon"
      })
    // TODO: Error handling
    return result.data
}

export async function getCommitHistory(info : RepoInfo) {
    const result = await octokit.request('GET /repos/{owner}/{repo}/stats/commit_activity', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        },
        owner: "d01000100",
        repo: "figma-token-engine"
    })
    return result.data
}