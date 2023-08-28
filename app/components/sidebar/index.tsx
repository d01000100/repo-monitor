import Search from "./autocomplete";
import EmptyState from "./empty-state";
import sidebarStyles from "./sidebar.module.css";

const Sidebar = () => {
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
    <EmptyState />
  </div>;
}
 
export default Sidebar;