import Search from "./autocomplete/input";
import EmptyState from "./empty-state";
import RepoCard from "./repo-card/repo-card";
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
    {/* Card container */}
    <div className="
      flex
      flex-col
      gap-4
    ">
      <RepoCard
        name="cool-repo"
        owner="roberto_melendez"
        stars={345145}
        updatedAt="2023-08-26T00:52:43Z"
        color="#4CCA8D"
        repoId={876}
      />
      <RepoCard
        name="cool-repo"
        owner="roberto_melendez"
        stars={34578954}
        updatedAt="2023-08-29T12:29:04Z"
        color="#D65C5C"
        repoId={876}
      />
      <RepoCard
        name="ultra-cool-repo-that-has-an-unimaginably-long-name"
        owner="roberto_melendez"
        stars={34578954}
        updatedAt="2023-08-04T12:29:04Z"
        color="#71B7F8"
        repoId={876}
      />
    </div>
    <EmptyState />
  </div>;
}
 
export default Sidebar;