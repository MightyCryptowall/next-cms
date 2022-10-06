import styles from "styles/Heading.module.scss";
import { MdAdd, MdRemove } from "react-icons/md";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { TbGripHorizontal } from "react-icons/tb";
import { useDrag } from "react-dnd";

interface HeadingThreeProps {
  id: string;
  position: number;
  heading: string;
  className?: string;
  editorMode?: boolean;
  openHeadingThreeModal: (position: number, title: string) => void;
  onDelete?: (position: number) => void;
}

const HeadingThree: React.FC<HeadingThreeProps> = ({
  id,
  position,
  heading,
  className,
  editorMode = false,
  openHeadingThreeModal,
  onDelete = () => {},
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [{ opacity }, drag, preview] = useDrag(
    () => ({
      type: "headingOne",
      item: {
        id,
        component: "headingOne",
        action: "reposition",
        heading: heading,
        position: position,
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
      end: (item, monitor) => {},
    }),
    [heading]
  );
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
      {editorMode && (
        <div className={styles["editor-controls"]}>
          <button
            onClick={() => openHeadingThreeModal(position, heading)}
            ref={drag}
            type="button"
          >
            <TbGripHorizontal />
          </button>
          <button
            onClick={() => openHeadingThreeModal(position, heading)}
            type="button"
          >
            Edit
          </button>
          <button onClick={() => onDelete(position)} type="button">
            Delete
          </button>
        </div>
      )}
      <h3
        className={headingOneStyle(active)}
        onClick={() => {
          setActive(!active);
        }}
      >
        {heading}
      </h3>
    </div>
  );
};

export default HeadingThree;
