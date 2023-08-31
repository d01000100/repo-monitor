import SearchIcon from "@/app/icons/search";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import autocompleteStyles from "./autocomplete.module.css";
import { Roboto } from "next/font/google";
import AutocompleteSuggestions from "./suggestions";
import { searchRepos } from "@/app/github-api";
import { Repo } from "@/app/model/reposSlice";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

interface SearchInputProps extends React.HTMLProps<HTMLInputElement> {
  
}

const SearchInput : React.FC<SearchInputProps> = (
  ({ ...inputProps }) => {

    const [isFocused, setFocused] = useState(false);
    const [isExpanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState<string>("");
    const [resultRepos, setResultRepos] = useState<Repo[]>([])

    const onFocus = useCallback(() => {
      setFocused(true)
      setExpanded(true)
    }, [])

    const onBlur = useCallback(() => {
      /* We wait a bit before closing the suggestions, in order for
        the suggestion button to be actually clicked before it disappears */
      setTimeout(() => {
        setExpanded(false)
      }, 50)
    }, [])

    const onChange = useCallback<ChangeEventHandler>((event) => {
      const value = (event.target as HTMLInputElement).value
      setQuery(value)
    }, [])
    
    /* Wait to send the query request some miliseconds after the user stopped writing */
    useEffect(() => {
      const timer = setTimeout(() => {
        if (query.length >= 3) {
          setIsLoading(true)
          searchRepos(query).then((repos) => {
            setResultRepos(repos)
            setIsLoading(false)
          })
        } else {
          setResultRepos([])
          setIsLoading(false)
        }
      },500)

      return () => clearTimeout(timer)
    }, [query])

    return (
      <div
        className={`
          w-full
          h-16
          bg-white
          flex
          flex-row
          items-center
          pr-6
          rounded-t
          gap-1
          ${isExpanded ? "" : "rounded-b"}
          relative
        `}
      >
        <input
          {...inputProps}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`
            ${inputProps.className}
            ${autocompleteStyles.searchInput}
            ${roboto.className}
            text-base
            font-normal
            placeholder:text-base
            placeholder:font-light
            w-full
            h-full
            pl-6
            bg-transparent
            ${isExpanded ? "" : "rounded-b"}
            rounded-t
          `}
          type="text"
          placeholder="Search a Github repository..."
          value={query}
          onChange={onChange}
        />
        <SearchIcon size={24} />
        {isExpanded && 
          <AutocompleteSuggestions
            suggestions={resultRepos}
            loading={isLoading}
            onSelect={() => { }}
          />
        }
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
