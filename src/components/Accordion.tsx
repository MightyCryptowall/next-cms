import styles from "styles/Accordion.module.scss";
import { MdAdd, MdRemove } from "react-icons/md";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

interface AccordionProps {
  position: number;
  heading: string;
  detail: string;
  arrow?: boolean;
  className?: string;
  openAccordionModal:(position: number, title: string, detail: string) => void;
  onDelete?: (position:number) => void;
}

const Accordion: React.FC<AccordionProps> = ({
  position,
  heading,
  detail,
  arrow = false,
  className,
  openAccordionModal,
  onDelete = () => {},
}) => {
  const [active, setActive] = useState<boolean>(false);
  console.log(position);
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
    <div className={styles["accordion-wrapper"]}>
      <div className={styles["editor-controls"]}>
        <button onClick={() => openAccordionModal(position,  heading, detail)} type="button">Edit</button>
        <button onClick={() => onDelete(position)} type="button">Delete</button>
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
