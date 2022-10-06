import Image from "next/image";
import Modal from "src/components/Modal";
import styles from "styles/PageViewer.module.scss";
import { FaSearch } from "react-icons/fa";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CSSProperties, FC, useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Accordion from "src/components/Accordion";
import AccordionModal from "src/components/modals/AccordionModal";
import AddMoreBox from "src/components/AddMoreBox";
import SearchBox from "src/components/SearchBox";
import SideBar from "src/components/SideBar";
import HeadingModal from "src/components/modals/HeadingModal";
import HeadingOne from "src/components/HeadingOne";
import HeadingTwo from "src/components/HeadingTwo";
import HeadingThree from "src/components/HeadingThree";

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

interface ComponentProps {
  id: string;
  heading: string;
  componentType: string;
  position: number;
  detail?: string;
}

const PageEditor: React.FC<PageEditorProps> = () => {
  const [components, setComponents] = useState<Array<ComponentProps> | []>([]);
  const [accordionModal, setAccordion] = useState({
    title: "",
    detail: "",
    open: false,
    position: 0,
  });
  const [headingModal, setHeading] = useState({
    title: "",
    open: false,
    position: 0,
  });

  const addNewComponent = (item: any) => {
    console.log({ item });
    setComponents((preState) => {
      const newComponents = preState as any[];
      let component: ComponentProps = {
        id: "",
        heading: "",
        componentType: "",
        position: 0,
      };

      if (item.name == "accordion") {
        component = {
          id: Date.now().toString(),
          heading: `Sample Accordion ${newComponents.length + 1}`,
          detail: `This is the sample detail ${newComponents.length}. I am making this text really really long.`,
          componentType: item.name,
          position: newComponents.length,
        };
      }

      if (
        item.name == "headingOne" ||
        item.name == "headingTwo" ||
        item.name == "headingThree"
      ) {
        component = {
          id: Date.now().toString(),
          heading: `Sample Heading ${newComponents.length + 1}`,
          componentType: item.name,
          position: newComponents.length,
        };
      }
      console.log(component);
      newComponents.push(component);
      return [...newComponents];
    });
  };

  const handleOnDelete = (position: number) => {
    const newList = [...components.filter((item) => item.position != position)];
    setComponents([...newList]);
  };

  const openAccordionModal = (
    position: number,
    title: string,
    detail: string
  ) => {
    const currentAccordionModal = { position, title, detail, open: true };
    setAccordion(currentAccordionModal);
  };

  const openHeadingModal = (position: number, title: string) => {
    const currentHeadingModal = { position, title, open: true };
    setHeading(currentHeadingModal);
  };

  const handleAccordionEditCancel = () => {
    setAccordion({
      position: 0,
      title: "",
      detail: "",
      open: false,
    });
  };

  const handleHeadingEditCancel = () => {
    setHeading({
      position: 0,
      title: "",
      // detail: "",
      open: false,
    });
  };

  const addInPosition = (component: any, position: number) => {
    console.log(component, position);
    if (component.action == "reposition") {
      if (component.position != position) {
        setComponents((preState) => {
          let prevComponents = preState.filter(
            (item) => item.id != component.id
          );
          let updatedData = {
            id: component.id,
            heading: component.heading,
            detail: component.detail,
            componentType: component.name,
            position,
          };

          const newComponents = prevComponents.filter(
            (item) => item.position < position
          );
          newComponents.push(updatedData);
          if (newComponents.length > 0) {
            newComponents.map((item, index) => {
              item.position = index;
              return item;
            });
          }

          let componentsAfterPosition = prevComponents.filter(
            (item) => item.position >= position
          );
          console.log([...componentsAfterPosition]);

          if (componentsAfterPosition.length > 0) {
            componentsAfterPosition.map((item, index) => {
              item.position = position + index + 1;
              return item;
            });
          }

          console.log({
            log_components: [...newComponents, ...componentsAfterPosition],
          });

          // console.log({components:[...newComponents, ...componentsAfterPosition]});
          return JSON.parse(
            JSON.stringify([...newComponents, ...componentsAfterPosition])
          );
        });
      }
    } else {
      setComponents((preState) => {
        let prevComponents = preState;
        let initData = {
          id: Date.now().toString(),
          heading: `Sample Heading ${prevComponents.length + 1}`,
          detail: `This is the sample detail ${prevComponents.length}. I am making this text really really long.`,
          componentType: component.name,
          position,
        };

        // if(component.action == "reposition"){
        //   prevComponents = prevComponents.filter(item => item.id != component.id);
        //   initData = {
        //     id: component.id,
        //     heading: component.heading,
        //     detail: component.detail,
        //     position,
        //   };
        //   console.log("reposition");
        // }

        const newComponents = prevComponents.filter(
          (item) => item.position < position
        );
        let componentsAfterPosition = prevComponents.filter(
          (item) => item.position >= position
        );

        newComponents.push(initData);

        if (componentsAfterPosition.length > 0) {
          componentsAfterPosition.map((item, index) => {
            item.position = +position + 1 + index;
            return item;
          });
        }
        console.log({
          components: [...newComponents, ...componentsAfterPosition],
        });
        return JSON.parse(
          JSON.stringify([...newComponents, ...componentsAfterPosition])
        );
      });
    }
  };

  const handleAccordionSave = (
    position: number,
    title: string,
    detail: string
  ) => {
    const newComponents = components.map((item) => {
      if (position == item.position) {
        return {
          id: item.id,
          heading: title,
          detail,
          componentType: item.componentType,
          position: item.position,
        };
      } else {
        return item;
      }
    });
    setComponents(newComponents);
    setAccordion({
      position: 0,
      title: "",
      detail: "",
      open: false,
    });
  };
  const handleHeadingSave = (position: number, title: string) => {
    const newComponents = components.map((item) => {
      if (position == item.position) {
        return {
          id: item.id,
          heading: title,
          componentType: item.componentType,
          position: item.position,
        };
      } else {
        return item;
      }
    });
    setComponents(newComponents);
    setHeading({
      position: 0,
      title: "",
      open: false,
    });
  };

  
  useEffect(() => {
    const storedData = localStorage.getItem("page-data");
    if(storedData){
      const storedComponents = JSON.parse(storedData);
      setComponents(storedComponents);
    }
  },[])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles["container"]}>
        {/* <Modal /> */}
        <AccordionModal
          position={accordionModal.position}
          title={accordionModal.title}
          detail={accordionModal.detail}
          onSave={handleAccordionSave}
          active={accordionModal.open}
          onCancel={handleAccordionEditCancel}
        />
        <HeadingModal
          position={headingModal.position}
          title={headingModal.title}
          onSave={handleHeadingSave}
          active={headingModal.open}
          onCancel={handleHeadingEditCancel}
        />
        <div className={styles["editor"]}>
          <HeaderComponent />
          {components.map((item, index) => (
            <div className={item.position.toString()} key={index}>
              <div style={{ marginTop: "1.5rem" }}></div>
              {item.componentType == "accordion" && (
                <Accordion
                  id={item.id}
                  position={item.position}
                  heading={item.heading}
                  detail={item.detail ? item.detail : ""}
                  onDelete={handleOnDelete}
                  openAccordionModal={openAccordionModal}
                  editorMode
                />
              )}
              {item.componentType == "headingOne" && (
                <HeadingOne
                  id={item.id}
                  position={item.position}
                  heading={item.heading}
                  onDelete={handleOnDelete}
                  openHeadingOneModal={openHeadingModal}
                  editorMode
                />
              )}
              {item.componentType == "headingTwo" && (
                <HeadingTwo
                  id={item.id}
                  position={item.position}
                  heading={item.heading}
                  onDelete={handleOnDelete}
                  openHeadingTwoModal={openHeadingModal}
                  editorMode
                />
              )}
              {item.componentType == "headingThree" && (
                <HeadingThree
                  id={item.id}
                  position={item.position}
                  heading={item.heading}
                  onDelete={handleOnDelete}
                  openHeadingThreeModal={openHeadingModal}
                  editorMode
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default PageEditor;
