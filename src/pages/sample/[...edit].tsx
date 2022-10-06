import Image from "next/image";
import Modal from "src/components/Modal";
import styles from "styles/PageEditor.module.scss";
import { FaSearch } from "react-icons/fa";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CSSProperties, FC, useState } from "react";
import { useDrop } from "react-dnd";
import Accordion from "src/components/Accordion";
import AccordionModal from "src/components/modals/AccordionModal";

interface PageEditorProps {}

interface AddMoreBoxProps {
  updateComponents: () => void;
}

interface SearchBoxProps {}
interface SidbarProps {}
interface DraggableComponentProps {}
interface HeaderComponentProps {}

const style: CSSProperties = {
  // border: '1px solid gray',
  // height: '15rem',
  width: "100%",
  // padding: '2rem',
  textAlign: "center",
};

const AddMoreBox: React.FC<AddMoreBoxProps> = ({ updateComponents }) => {
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
        ].join(" ")}
      >
        Add More
      </div>
    </div>
  );
};

const SearchBox: React.FC<SearchBoxProps> = () => {
  return (
    <div className={styles["search-box"]}>
      <input type="text" />
      <button>
        <FaSearch />
      </button>
    </div>
  );
};

const Sidbar: React.FC<SidbarProps> = () => {
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

const HeaderComponent: React.FC<HeaderComponentProps> = () => {
  return (
    <div className={styles["image-container"]}>
      <Image
        src="https://picsum.photos/1200/500"
        layout="fill"
        alt="banner image"
      />
    </div>
  );
};

const PageEditor: React.FC<PageEditorProps> = () => {
  const [components, setComponents] = useState([
    {
      heading: "Sample Heading 1",
      detail:
        "This is the sample detail. I am making this text really really long.",
      position: 1
    },
  ]);
  const [accordionModal, setAccordion] = useState({
    title: "",
    detail: "",
    open: false,
    position: 0,
  });

  const updateComponents = () => {
    // console.log(newComponents);

    setComponents((preState) => {
      const newComponents = preState;
      newComponents.push({
        heading: `Sample Heading ${newComponents.length}`,
        detail: `This is the sample detail ${newComponents.length}. I am making this text really really long.`,
        position: newComponents.length + 1,
      });
      return [...newComponents];
    });
  };

  const handleOnDelete = (id: number) => {
    const newList = [...components.filter((item, index) => index != id)];
    console.log(newList);
    setComponents([...newList]);
  };

  const openAccordionModal = (position: number, title: string, detail: string) => {
    const currentAccordionModal = { position, title, detail, open: true };
    setAccordion(currentAccordionModal);
  };

  const handleAccordionEditCancel = () => {
    setAccordion({
      position: 0,
      title: "",
      detail: "",
      open: false,
    });
  };

  const handleSave = (position: number, title: string, detail: string) => {
    console.log(position);
    const newComponents = components.map((item) => {
      if(position == item.position){
        return {
          heading: title,
          detail,
          position: item.position,
        }
      }else{
        return item
      }
    })
    setComponents(newComponents);
    setAccordion({
      position: 0,
      title: "",
      detail: "",
      open: false,
    });
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles["container"]}>
        {/* <Modal /> */}
        <Sidbar />
        <AccordionModal
          position={accordionModal.position}
          title={accordionModal.title}
          detail={accordionModal.detail}
          onSave={handleSave}
          active={accordionModal.open}
          onCancel={handleAccordionEditCancel}
        />
        <div className={styles["editor"]}>
          <HeaderComponent />
          {components.map((item, index) => (
            <Accordion
              id={index + 1}
              heading={item.heading}
              detail={item.detail}
              onDelete={handleOnDelete}
              key={index}
              openAccordionModal={openAccordionModal}
            />
          ))}
          <AddMoreBox updateComponents={updateComponents} />
        </div>
      </div>
    </DndProvider>
  );
};

export default PageEditor;
