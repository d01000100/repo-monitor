import { FC, useCallback } from "react";
import autocompleteStyles from "./autocomplete.module.css";
import { Repo, addCommitActivity, addRepo } from "@/app/model/reposSlice";
import { useAppDispatch } from "@/app/model/hooks";
import { closeSuggestions } from "@/app/model/searchSlice";
import axios from "axios";

const Suggestion: FC<Repo> = (repo) => {

  const { name, owner } = repo;
  const dispatch = useAppDispatch();

  const handleSelect = useCallback(() => {
    dispatch(addRepo(repo))
    dispatch(closeSuggestions())
    axios.get(`/api/github/commits?name=${repo.name}&owner=${repo.owner}`).then(response => {
      if (response.status !== 200) {
        return;
      }
      dispatch(addCommitActivity({
        id: repo.id,
        commitActivity: response.data
      }))
    })
      .catch(error => {
        console.error(`Error while getting the commits`)
        console.error(error)
      })
  }, [dispatch, repo])

  return (
    <button
      className={`
      ${autocompleteStyles.suggestion}
      text-left
      bg-white
      px-6
      text-base
    `}
      style={{ lineHeight: "44px" }}
      onClick={handleSelect}
    >
      {/* color: #8383AF;
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal; */}
      <span
        className={`
        ${autocompleteStyles.secondaryTextColor}
        font-light
      `}
      >
        {owner} /{" "}
      </span>
      {/* color: #37374A;
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal; */}
      <span
        className={`
        ${autocompleteStyles.primaryTextColor}
        font-semibold
      `}
      >
        {name}
      </span>
    </button>
  );
};

interface SuggestionListProps extends React.OlHTMLAttributes<HTMLUListElement> {
  suggestions: Repo[];
  loading?: boolean;
  onSelect: () => void;
}

const EmptyState = ({content} : {content: string}) => {
  return (
    <div
      className={`
      ${autocompleteStyles.secondaryTextColor}
      px-6
      py-3
      text-base
    `}
    >{content}</div>
  );
};

const AutocompleteSuggestions: React.FC<SuggestionListProps> = ({
  suggestions,
  loading,
  className
}) => {

  const emptyStateContent = loading ? "Loading..." : "No repositories were found";

  return (
    <ul
      className={`
      ${className}
      overflow-y-clip
      absolute
      top-full
      bg-white
      w-full
      flex
      flex-col
      z-10
    `}
    >
      {loading || suggestions.length === 0 ? (
        <EmptyState content={emptyStateContent} />
      ) : (
        suggestions.map((repo, idx) => (
          <Suggestion
            key={`suggestion-${idx}`}
            {...repo}
          />
        ))
      )}
    </ul>
  );
};

export default AutocompleteSuggestions;
