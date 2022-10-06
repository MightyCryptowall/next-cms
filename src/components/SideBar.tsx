import SearchBox from "./SearchBox";
import styles from "styles/SideBar.module.scss";
import DraggableComponent from "./DraggableComponent";

interface SideBarProps {
  
}
 
const SideBar: React.FC<SideBarProps> = () => {
  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles["sidebar"]}>
        <SearchBox />
        <div className={styles["component-list"]}>
          <DraggableComponent />
        </div>
      </div>
    </div>
  );
};
 
export default SideBar;