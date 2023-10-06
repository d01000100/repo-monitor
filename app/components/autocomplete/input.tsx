import SearchIcon from "@/app/icons/search";
import { ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react";
import autocompleteStyles from "./autocomplete.module.css";
import { Roboto } from "next/font/google";
import AutocompleteSuggestions from "./suggestions";
import { Repo } from "@/app/model/reposSlice";
import { closeSuggestions, getOpenSuggestions, openSuggestions } from "@/app/model/searchSlice";
import { useAppDispatch, useAppSelector } from "@/app/model/hooks";
import useOnClickOutside from "use-onclickoutside";
import axios from "axios";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

interface SearchInputProps extends React.HTMLProps<HTMLInputElement> {
  
}

const SearchInput : React.FC<SearchInputProps> = (
  ({ ...inputProps }) => {

    const isExpanded = useAppSelector(getOpenSuggestions);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState<string>("");
    const [resultRepos, setResultRepos] = useState<Repo[]>([])
    const containerRef = useRef(null);

    useOnClickOutside(containerRef, () => {
      dispatch(closeSuggestions())
    })

    const onFocus = useCallback(() => {
      dispatch(openSuggestions())
    }, [dispatch])

    const onBlur = useCallback(() => {
      
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
          axios.get(`/api/github/search?query=${query}`).then((response) => {
            if (response.status !== 200) {
              return;
            }
            setResultRepos(response.data)
          })
          .catch((error) => {
            console.error(`Error when searching repos`)
            console.error(error)
          })
          .finally(() => {
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
        ref={containerRef}
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
        <AutocompleteSuggestions
          className={`
            ${isExpanded ? 
              "h-fit" :
              "h-0"
            }
          `}
          suggestions={resultRepos}
          loading={isLoading}
          onSelect={() => { }}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
