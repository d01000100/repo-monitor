import { FC } from "react";
import autocompleteStyles from "./autocomplete.module.css"

interface SuggestionProps {
  name: string;
  owner: string;
  onSelect: () => void;
}

const Suggestion: FC<SuggestionProps> = ({ name, owner, onSelect }) => {
  return <button
    className={`
      ${autocompleteStyles.suggestion}
      text-left
      bg-white
      px-6
      text-base
    `}
    style={{lineHeight: "44px"}}
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
    >{owner} / </span>
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
    >{name}</span>
  </button>
};

const AutocompleteSuggestions = () => {

  const suggestions = [
    {
      repoID: 1234,
      name: "react",
      owner: "facebook"
    },
    {
      repoID: 1235,
      name: "react-motion",
      owner: "chenglou"
    },
    {
      repoID: 1233,
      name: "react-infinite",
      owner: "seatgeek"
    },
  ]

  return (
    <ul
      className={`
      absolute
      top-full
      bg-white
      w-full
      h-fit
      flex
      flex-col
      z-10
    `}
    >
      {suggestions.map(({name, owner, repoID}) => 
        <Suggestion
          key={repoID}
          name={name}
          owner={owner}
          onSelect={() => {}} />
      )}
    </ul>
  );
};

export default AutocompleteSuggestions;
