"use client";

import EmptyState from "./empty-state";
import RepoCard from "../repo-card";
import sidebarStyles from "./sidebar.module.css";
import { useAppSelector } from "@/app/model/hooks";
import { getRepoCards } from "@/app/model/reposSlice";
import SearchInput from "../autocomplete/input";

const Sidebar = () => {
  const repos = useAppSelector(getRepoCards);

  return (
    <div
      style={sidebarStyles}
      className={`
      ${sidebarStyles.sidebar}
      w-2/5
      h-screen
      pt-[71px]
      pb-[43px]
      px-6
      flex
      flex-col
      gap-4
    `}
    >
      <SearchInput />
      {/* Card container */}
      <div
        className="
        flex
        flex-col
        gap-4
      "
      >
        {repos.length ? (
          repos.map((repo) => {
            return <RepoCard key={repo.id} {...repo} color="#4CCA8D" />;
          })
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
