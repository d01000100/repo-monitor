import React, { useCallback, useMemo } from "react";
import repoCardStyles from "./repo-card.module.css";
import moment from "moment";
import TrashIcon from "@/app/icons/trash";
import StarIcon from "@/app/icons/star";
import { useAppDispatch } from "@/app/model/hooks";
import { RepoInView, removeRepo } from "@/app/model/reposSlice";

interface RepoCardProps extends RepoInView {
  color: string;
}

const RepoCard: React.FC<RepoCardProps> = ({
  name,
  owner,
  stars,
  updatedAt,
  color,
  id,
}) => {
  const starsAbbr = useMemo(() => {
    if (stars < 1000) {
      return stars.toString();
    }

    if (stars < 1000000) {
      return `${(stars / 1000).toFixed(1)}k`;
    }

    return `${(stars / 1000000).toFixed(1)}M`;
  }, [stars]);

  const updatedText = useMemo(() => {
    const lastUpdated = moment(updatedAt);
    const today = moment();

    const daysAgo = today.diff(lastUpdated, "days");

    if (daysAgo <= 7) {
      return lastUpdated.from(today);
    }

    return `on ${lastUpdated.format("MMM D, YYYY")}`;
  }, [updatedAt]);

  const shadowStyle = useMemo(() => {
    return `8px 0px 0px 0px ${color} inset`;
  }, [color]);

  const dispatch = useAppDispatch();
  const onDelete = useCallback(() => {
    dispatch(removeRepo(id))
  }, [dispatch, id])

  return (
    <div
      className={`
        ${repoCardStyles.repoCard}
        text-left
        w-full
        h-fit
        py-4
        px-6
        rounded
        flex
        flex-col
        justify-start
        gap-2
        relative        
      `}
      style={{
        boxShadow: shadowStyle,
      }}
      tabIndex={0}
      aria-label={`Highligthing ${owner} ${name} repository`}
    >
      <div
        className="
          flex
          flex-row
          gap-1
          text-lg
          w-full
          h-7
        "
      >
        <p
          className={`
            ${repoCardStyles.textSecondaryColor}
            font-normal
            w-min
            whitespace-nowrap
          `}
        >
          {owner} /{" "}
        </p>
        <p
          className={`
            ${repoCardStyles.textPrimaryColor}
            font-bold
            w-full
            inline-block
            overflow-hidden
            text-ellipsis
            whitespace-nowrap
          `}
        >
          {name}
        </p>
      </div>
      <div
        className="
          text-sm
          flex
          flex-row
          gap-2
        "
      >
        <div
          className={`
            ${repoCardStyles.textPrimaryColor}
            font-bold
            flex
            items-center
            gap-1
          `}
        >
          <StarIcon size={16} />
          <span>{starsAbbr}</span>
        </div>
        <span
          className={`
        ${repoCardStyles.textSecondaryColor}
        font-normal
      `}
        >
          Updated {updatedText}
        </span>
      </div>
      <button
        className={`
          ${repoCardStyles.deleteButton}
          absolute
          right-0
          top-0
        text-white
          h-full
          flex
          flex-col
          items-center
          justify-center
          py-7
          pl-[18px]
          pr-6
          rounded-e
        `}
        aria-label={`Remove repo ${name}`}
        onClick={onDelete}
      >
        <TrashIcon size={28}></TrashIcon>
      </button>
    </div>
  );
};

export default RepoCard;
