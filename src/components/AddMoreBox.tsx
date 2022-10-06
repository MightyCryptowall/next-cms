import { CSSProperties } from "react";
import { useDrop } from "react-dnd";
import styles from "styles/AddMoreBox.module.scss";

interface AddMoreBoxProps {
  updateComponents: () => void;
  betweenCompnents?: boolean;
}

const style: CSSProperties = {
  // border: '1px solid gray',
  // height: '15rem',
  width: "100%",
  // padding: '2rem',
  textAlign: "center",
};
 
const AddMoreBox: React.FC<AddMoreBoxProps> = ({ updateComponents, betweenCompnents = false }) => {
  const [{ isActive }, drop] = useDrop(() => ({
    accept: "box",
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
    drop: (item, monitor) => {
      console.log(monitor.getItem());
      updateComponents();
    },
  }));
  return (
    <div ref={drop} style={style}>
      <div
        className={[
          styles["add-more-box"],
          isActive ? styles["drop"] : "",
          betweenCompnents ? styles["between-components"] : ""
        ].join(" ")}
      >
        Drop Here
      </div>
    </div>
  );
};
 
export default AddMoreBox;