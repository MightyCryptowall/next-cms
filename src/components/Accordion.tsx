import styles from "styles/Accordion.module.scss";
import { MdAdd, MdRemove } from "react-icons/md";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { TbGripHorizontal } from "react-icons/tb";
import { useDrag } from "react-dnd";

interface AccordionProps {
  id: string;
  position: number;
  heading: string;
  detail: string;
  arrow?: boolean;
  className?: string;
  openAccordionModal: (position: number, title: string, detail: string) => void;
  onDelete?: (position: number) => void;
}

const Accordion: React.FC<AccordionProps> = ({
  id,
  position,
  heading,
  detail,
  arrow = false,
  className,
  openAccordionModal,
  onDelete = () => {},
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [{ opacity }, drag, preview] = useDrag(() => ({
    type: "accordion",
    item: {
      id,
      component: "accordion",
      action: "reposition",
      heading:heading,
      detail:detail,
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

  const accordionStyle = (status: boolean) => {
    if (status) {
      return [styles["accordion"], styles["active"], className].join(" ");
    }
    return [styles["accordion"], className].join(" ");
  };


  // isArrow
  const controlStyle = (status: boolean) => {
    if (status) {
      return [styles["control"], styles["arrow"]].join(" ");
    }
    return styles["control"];
  };

  

  return (
    <div className={[styles["accordion-wrapper"], id].join(" ")} ref={preview}>
      <div className={styles["editor-controls"]}>
        <button
          onClick={() => openAccordionModal(position, heading, detail)}
          ref={drag}
          type="button"
        >
          <TbGripHorizontal />
        </button>
        <button
          onClick={() => openAccordionModal(position, heading, detail)}
          type="button"
        >
          Edit
        </button>
        <button onClick={() => onDelete(position)} type="button">
          Delete
        </button>
      </div>
      <div
        className={accordionStyle(active)}
        onClick={() => {
          setActive(!active);
        }}
      >
        <div className={styles["accordion-header"]}>
          <h5 className={styles["header"]}>{heading}</h5>
          <div className={controlStyle(arrow)}>
            {arrow ? (
              <>
                <FaChevronRight
                  className={active ? styles["hidden"] : styles["active"]}
                />
                <FaChevronDown
                  className={active ? styles["active"] : styles["hidden"]}
                />
              </>
            ) : (
              <>
                <MdAdd
                  className={active ? styles["hidden"] : styles["active"]}
                />
                <MdRemove
                  className={active ? styles["active"] : styles["hidden"]}
                />
              </>
            )}
          </div>
        </div>
        <div className={detailStatus(active)}>{detail}</div>
      </div>
    </div>
  );
};

export default Accordion;
