import styles from "styles/Heading.module.scss";
import { MdAdd, MdRemove } from "react-icons/md";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { TbGripHorizontal } from "react-icons/tb";
import { useDrag } from "react-dnd";

interface HeadingTwoProps {
  id: string;
  position: number;
  heading: string;
  className?: string;
  openHeadingTwoModal: (position: number, title: string) => void;
  onDelete?: (position: number) => void;
}

const HeadingTwo: React.FC<HeadingTwoProps> = ({
  id,
  position,
  heading,
  className,
  openHeadingTwoModal,
  onDelete = () => {},
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [{ opacity }, drag, preview] = useDrag(() => ({
    type: "headingOne",
    item: {
      id,
      component: "headingOne",
      action: "reposition",
      heading:heading,
      position:position,
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
    end: (item, monitor) => {
    },
  }),[heading]);
  const detailStatus = (status: boolean) => {
    if (status) {
      return [styles["detail"], styles["active"]].join(" ");
    }

    return [styles["detail"], styles["hidden"]].join(" ");
  };

  const headingOneStyle = (status: boolean) => {
    if (status) {
      return [styles["headingOne"], styles["active"], className].join(" ");
    }
    return [styles["headingOne"], className].join(" ");
  };


  // isArrow
  const controlStyle = (status: boolean) => {
    if (status) {
      return [styles["control"], styles["arrow"]].join(" ");
    }
    return styles["control"];
  };

  

  return (
    <div className={[styles["heading-wrapper"], id].join(" ")} ref={preview}>
      <div className={styles["editor-controls"]}>
        <button
          onClick={() => openHeadingTwoModal(position, heading)}
          ref={drag}
          type="button"
        >
          <TbGripHorizontal />
        </button>
        <button
          onClick={() => openHeadingTwoModal(position, heading)}
          type="button"
        >
          Edit
        </button>
        <button onClick={() => onDelete(position)} type="button">
          Delete
        </button>
      </div>
      <h2
        className={headingOneStyle(active)}
        onClick={() => {
          setActive(!active);
        }}
      >
        {heading}
      </h2>
    </div>
  );
};

export default HeadingTwo;
