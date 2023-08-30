import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import type { RootState } from './store'
import lodash from "lodash"

export interface CommitActivity {
  week: number;
  total: number;
}

// Define a type for the slice state
export interface Repo {
  id: number,
  name: string,
  owner: string,
  stars: number,
  updatedAt: string,
  commitActivity: CommitActivity[]
}

export type RepoInView = Pick<Repo, "name" | "owner" | "stars" | "updatedAt" | "id">

export interface ActiveRepos {
  active: Repo[],
  highlightedRepo?: Repo["id"],
}

// Define the initial state using that type
const initialState : ActiveRepos = {
  active: [
    {
      id: 123312,
      name: "cool-repo",
      owner: "roberto_melendez",
      stars: 4151542,
      updatedAt: "2023-08-29T12:29:04Z",
      commitActivity: []
    },
    {
      id: 123311,
      name: "another-cool-repo",
      owner: "roberto_melendez",
      stars: 41515,
      updatedAt: "2023-08-22T12:29:04Z",
      commitActivity: []
    },
    {
      id: 123313,
      name: "cool-repo-with-a-super-long-name-that-definitely-does-not-fit-in-any-screen",
      owner: "roberto_melendez",
      stars: 412,
      updatedAt: "2022-08-29T12:29:04Z",
      commitActivity: []
    },
  ]
}

export const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    addRepo: (state, payload : PayloadAction<Repo>) => {},
    removeRepo: (state, {payload} : PayloadAction<Repo["id"]>) => {
      state.active = state.active.filter((repo) => repo.id !== payload)
    },
    highlightRepo: (state, {payload} : PayloadAction<Repo["id"]>) => {
      state.highlightedRepo = payload;
    },
    unHighlightRepo: (state) => {
      state.highlightedRepo = undefined;
    }
  }
})

export const { addRepo, removeRepo } = reposSlice.actions

export const getRepoCards = createSelector(
  [(state: RootState) => state.repos.active],
  repos => repos.map(repo =>
    lodash.pick(repo, "id", "isHighlighted", "name", "owner", "stars", "updatedAt") as RepoInView
  )
)

export const getCommitActivites = (state: RootState) => state.repos.active.map(repo => {
  const {id} = repo;
  return {
    ...repo.commitActivity,
    id
  }
})

export const getHighlightedRepo = (state: RootState) => state.repos.highlightedRepo;

export default reposSlice.reducer