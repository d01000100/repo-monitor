import SearchIcon from "@/app/icons/search";
import sidebarStyles from "./sidebar.module.css"

const EmptyState = () => {
  return <div className={`
    ${sidebarStyles.emptyState}
    empty-state
    rounded-2xl
    w-full
    h-fit
    flex
    flex-col
    gap-7
    items-center
    justify-center
    py-11
    px-16
  `}>
    <SearchIcon size={49} />
    <p className="
      text-center
      text-lg
      font-normal
    ">Search for a Github repository to populate graph</p>
  </div>;
}
 
export default EmptyState;