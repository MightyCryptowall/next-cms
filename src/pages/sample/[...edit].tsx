import Image from "next/image";
import Modal from "src/components/Modal";
import styles from "styles/PageEditor.module.scss";
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
import dynamic from "next/dynamic";
import { RichTextComponentProps } from "components/RichTextComponent";
import { ContentState, convertFromRaw, convertToRaw, EditorState, RawDraftContentState } from "draft-js";

interface PageEditorProps {}

interface HeaderComponentProps {}

const RichTextComponent = dynamic<RichTextComponentProps>(
  () => import("components/RichTextComponent"),
  { ssr: false }
);

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

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
export interface ComponentProps {
  id: string;
  componentType: string;
  position: number;
  heading?: string;
  editorState?: EditorState;
  contentState?: RawDraftContentState;
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

      if (item.name == "richText") {
        component = {
          id: Date.now().toString(),
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

  const handleAccordionSave = (position: number, title: string, detail: string) => {
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


  const onSave = () => {
    localStorage.setItem("page-data", JSON.stringify(components));
  }

  const updateRichTextContent = (editorState: EditorState, position: number) => {
    const newComponents = components.map((item) => {
      if (position == item.position) {
        return {
          ...item,
          contentState: convertToRaw(editorState.getCurrentContent()),
          editorState,
          position
        };
      } else {
        return item;
      }
    });
    setComponents(newComponents);
  }

  useEffect(() => {
    const storedData = localStorage.getItem("page-data");
    if(storedData){
      let storedComponents = JSON.parse(storedData) as ComponentProps[];
      storedComponents = storedComponents.map(item => {
        if(item.componentType == "richText"){
          item.editorState = EditorState.createWithContent(convertFromRaw(item.contentState ? item.contentState : content));
          return item;
        }else{
          return item;
        }
      }) as ComponentProps[];
      setComponents(storedComponents);
    }
  },[])
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles["container"]}>
        {/* <Modal /> */}
        <SideBar onSave={onSave} />
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
              <AddMoreBox
                addNewComponent={(component) => addInPosition(component, index)}
                key={index}
                betweenCompnents
              />
              {item.componentType == "accordion" && (
                <Accordion
                  id={item.id}
                  position={item.position}
                  heading={item.heading ? item.heading : ""}
                  detail={item.detail ? item.detail : ""}
                  onDelete={handleOnDelete}
                  openAccordionModal={openAccordionModal}
                />
              )}
              {item.componentType == "headingOne" && (
                <HeadingOne
                  id={item.id}
                  position={item.position}
                  heading={item.heading ? item.heading : ""}
                  onDelete={handleOnDelete}
                  openHeadingOneModal={openHeadingModal}
                />
              )}
              {item.componentType == "headingTwo" && (
                <HeadingTwo
                  id={item.id}
                  position={item.position}
                  heading={item.heading ? item.heading : ""}
                  onDelete={handleOnDelete}
                  openHeadingTwoModal={openHeadingModal}
                />
              )}
              {item.componentType == "headingThree" && (
                <HeadingThree
                  id={item.id}
                  position={item.position}
                  heading={item.heading ? item.heading : ""}
                  onDelete={handleOnDelete}
                  openHeadingThreeModal={openHeadingModal}
                />
              )}
              {item.componentType == "richText" && (
                <RichTextComponent
                  id={item.id}
                  editorState={item.editorState ? item.editorState : EditorState.createEmpty()}
                  updateRichTextContent={updateRichTextContent}
                  position={item.position}
                />
              )}
            </div>
          ))}
          <AddMoreBox addNewComponent={addNewComponent} />
        </div>
      </div>
    </DndProvider>
  );
};

export default PageEditor;
