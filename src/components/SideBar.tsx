import SearchBox from "./SearchBox";
import styles from "styles/SideBar.module.scss";
import DraggableComponent from "./DraggableComponent";

interface SideBarProps {
  
}

const components = [
  {
    title: "Heading 1",
    icon: "https://sbn-bucket.s3.ap-south-1.amazonaws.com/heading-one-icon.png",
    name: "headingOne"
  },
  {
    title: "Heading 2",
    icon: "https://sbn-bucket.s3.ap-south-1.amazonaws.com/heading-two-icon.png",
    name: "headingTwo"
  },
  {
    title: "Heading 3",
    icon: "https://sbn-bucket.s3.ap-south-1.amazonaws.com/heading-three-icon.png",
    name: "headingThree"
  },
  {
    title: "Accordion Component",
    icon: "https://sbn-bucket.s3.ap-south-1.amazonaws.com/accordion-icon.png",
    name: "accordion"
  },
]
 
const SideBar: React.FC<SideBarProps> = () => {
  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles["sidebar"]}>
        <SearchBox />
        <div className={styles["component-list"]}>
          {
            components.map((component, key) => (
              <div key={key} style={{marginBlock:"0.3rem"}}>
                <DraggableComponent title={component.title} icon={component.icon} name={component.name}/>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};
 
export default SideBar;