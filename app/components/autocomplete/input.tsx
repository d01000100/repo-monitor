import SearchIcon from "@/app/icons/search";
import React from "react";
import autocompleteStyles from "./autocomplete.module.css";
import { Roboto } from "next/font/google";
import AutocompleteSuggestions from "./suggestions";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

interface SearchInputProps extends React.HTMLProps<HTMLInputElement> {
  expanded?: boolean;
}

const SearchInput : React.FC<SearchInputProps> = (
  ({ expanded, ...inputProps }) => {
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
          ${expanded ? "" : "rounded-b"}
          relative
        `}
      >
        <input
          {...inputProps}
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
          `}
          type="text"
          placeholder="Search a Github repository..."
        />
        <SearchIcon size={24} />
        {/*<AutocompleteSuggestions />*/}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
