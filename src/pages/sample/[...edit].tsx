import Image from "next/image";
import Modal from "src/components/Modal";
import styles from "styles/PageEditor.module.scss";

interface PageEditorProps {}


interface AddMoreBoxProps {
  
}
 
const AddMoreBox: React.FC<AddMoreBoxProps> = () => {
  return ( 
    <button className={styles["add-more-box"]}>
      Add More
    </button>
  );
}

const PageEditor: React.FC<PageEditorProps> = () => {
  return (
    <div className={styles["container"]}>
      <Modal />
      <div className={styles["image-container"]}>
        <Image
          src="https://picsum.photos/1200/500"
          layout="fill"
          alt="banner image"
        />
        <AddMoreBox />
      </div>
    </div>
  );
};

export default PageEditor;
