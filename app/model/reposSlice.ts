import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { ColorProvider } from './colorProvider';

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
  color?: string,
  commitActivity?: CommitActivity[]
}

export interface AddCommitsProps {
  id: Repo["id"],
  commitActivity: Required<Repo["commitActivity"]>
}

export interface ActiveRepos {
  active: Repo[],
  highlightedRepo?: Repo["id"],
}

// Define the initial state using that type
const initialState: ActiveRepos = {
  active: []
}

export const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    addRepo: (state, { payload }: PayloadAction<Repo>) => {
      const repeated = state.active.some(({ id }) => id === payload.id)
      if (!repeated) {
        state.active.push({
          ...payload,
          color: ColorProvider.getColor(),
        });
      }
    },
    addCommitActivity: (state, { payload }: PayloadAction<AddCommitsProps>) => {
      state.active = state.active.map(repo => {

        if (repo.id !== payload.id) return repo;

        return {
          ...repo,
          commitActivity: payload.commitActivity
        }
      })

    },
    removeRepo: (state, { payload }: PayloadAction<Repo["id"]>) => {
      state.active = state.active.filter((repo) => repo.id !== payload)
    },
    highlightRepo: (state, { payload }: PayloadAction<Repo["id"]>) => {
      state.highlightedRepo = payload;
    },
    unHighlightRepo: (state) => {
      state.highlightedRepo = undefined;
    }
  }
})

export const { addRepo, removeRepo, addCommitActivity, highlightRepo, unHighlightRepo } = reposSlice.actions

export const getRepoCards = (state: RootState) => state.repos.active;

export const getCommitActivites = createSelector(
  [(state: RootState) => state.repos.active],
  repos => repos
    .filter(({ commitActivity }) => commitActivity !== undefined)
    .map(repo => {
    const { id, color, commitActivity } = repo;
    return {
      commitActivity: commitActivity!,
      id,
      color
    }
  })
)

export const getHighlightedRepo = (state: RootState) => state.repos.highlightedRepo;

export default reposSlice.reducer