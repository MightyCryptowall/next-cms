import Image from "next/image";
import { useDrag } from "react-dnd";
import styles from "styles/DraggableComponent.module.scss";

interface DraggableComponentProps {
  title: string,
  icon: string,
  name: string
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({title, icon, name}) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: name,
      options: {
        dropEffect: "copy",
      },
      item: {
        name: name,
        // component: name,
        action: "new",
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
      end: (item, monitor) => {
      }
    }),
    []
  );
  return (
    <div ref={drag} className={styles["draggable-component"]}>
      <div className={styles["icon-container"]}>
        <Image
          src={icon}
          width="100"
          height="100"
          alt="accordion icon"
        />
      </div>
      <h5>{title}</h5>
    </div>
  );
};

export default DraggableComponent;
