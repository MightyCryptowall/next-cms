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
import AddMoreBox from "src/components/AddMoreBox";
import SearchBox from "src/components/SearchBox";
import SideBar from "src/components/SideBar";

interface PageEditorProps {}





interface HeaderComponentProps {}











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
        heading: `Sample Heading ${newComponents[newComponents.length - 1]?.position + 1}`,
        detail: `This is the sample detail ${newComponents.length}. I am making this text really really long.`,
        position: newComponents[newComponents.length - 1].position + 1,
      });
      return [...newComponents];
    });
  };

  const handleOnDelete = (position: number) => {
    const newList = [...components.filter((item) => item.position != position)];
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
        <SideBar />
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
              position={item.position}
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
