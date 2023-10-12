"use client";

import EmptyState from "./empty-state";
import RepoCard from "../repo-card";
import sidebarStyles from "./sidebar.module.css";
import { useAppSelector } from "@/app/model/hooks";
import { getRepoCards } from "@/app/model/reposSlice";
import SearchInput from "../autocomplete/input";
import Image from "next/image";

const Sidebar = () => {
  const repos = useAppSelector(getRepoCards);

  return (
    <div
      className={`
        ${sidebarStyles.sidebar}
        h-screen
        flex
        flex-col
        w-2/5
        pt-[71px]
        pb-[43px]
        px-6
        gap-4
      `}
    >
      <div
        className={`
        h-full
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
        overflow-y-scroll
      "
        >
          {repos.length ? (
            repos.map((repo) => {
              return <RepoCard key={repo.id} {...repo} />;
            })
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      <div
        className="
          text-white
          flex
          align-middle
          justify-end
          gap-2
        "
      >
        <span>
          Made by&nbsp;
          <a
            href="https://d1000100.dev"
            className="
              text-blue-400
              hover:underline
            "
          >
            Daniel Casado (D1000100)
          </a>
        </span>
        <a href="https://github.com/d01000100/repo-monitor">
          <Image
            width={12}
            height={12}
            style={{
              aspectRatio: 1,
              width: "24px",
            }}
            src="/github-mark-white.svg"
            alt="Link to my github"
          />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
