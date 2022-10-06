import Image from "next/image";
import { useDrag } from "react-dnd";
import styles from "styles/DraggableComponent.module.scss";

interface DraggableComponentProps {}

const DraggableComponent: React.FC<DraggableComponentProps> = () => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: "box",
      options: {
        dropEffect: "copy",
      },
      item: {
        component: "accordion component",
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    []
  );
  return (
    <div ref={drag} className={styles["draggable-component"]}>
      <div className={styles["icon-container"]}>
        <Image
          src="https://sbn-bucket.s3.ap-south-1.amazonaws.com/accordion-icon.png"
          width="100"
          height="100"
          alt="accordion icon"
        />
      </div>
      <h5>Accordion Component</h5>
    </div>
  );
};

export default DraggableComponent;