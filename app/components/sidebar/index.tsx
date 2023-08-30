'use client';

import Search from "../autocomplete";
import EmptyState from "./empty-state";
import RepoCard from "../repo-card";
import sidebarStyles from "./sidebar.module.css";
import { useAppSelector } from "@/app/model/hooks";
import { getRepoCards } from "@/app/model/reposSlice";

const Sidebar = () => {

  const repos = useAppSelector(getRepoCards);

  return <div style={sidebarStyles} className={`
    ${sidebarStyles.sidebar}
    w-2/5
    h-screen
    pt-[71px]
    pb-[43px]
    px-6
    flex
    flex-col
    gap-4
  `}>
    <Search />
    {/* Card container */}
    <div className="
      flex
      flex-col
      gap-4
    ">
      {repos.map(repo => {
        return <RepoCard
          key={repo.id}
          {...repo}
          color="#4CCA8D"
        />
      })}
    </div>
    <EmptyState />
  </div>;
}
 
export default Sidebar;