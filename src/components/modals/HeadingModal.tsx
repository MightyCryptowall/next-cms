import { LegacyRef, useEffect, useRef } from "react";
import styles from "styles/AccordionModal.module.scss"

interface HeadingModalProps {
  position: number,
  title: string,
  active: boolean,
  onSave: (position: number, title: string) => void;
  onCancel: () => void;
}
 
const HeadingModal: React.FC<HeadingModalProps> = ({position, title, active, onSave, onCancel}) => {
  const titleRef: LegacyRef<HTMLInputElement> | undefined = useRef(null);

  const handleSave = () => {
    const titleValue = titleRef.current?.value as string;
    onSave(position,titleValue);
  }

  useEffect(() => {
    const titleInput = titleRef.current as HTMLInputElement;
    titleInput.value = title;
    
  },[position,title])

  return ( 
    <div className={[styles["container"], active ? styles["active"] : ""].join(" ")}>
      <form className={styles["accordion-modal"]}>
        <h3>Heading</h3>
        <input name="title" type="text" placeholder="Title" ref={titleRef} />
        <div className={styles["controls"]}>
          <button className={styles["save"]} onClick={handleSave} type="button">Save</button>
          <button className={styles["cancel"]} onClick={onCancel} type="button">Cancel</button>
        </div>
      </form>
    </div>
   );
}
 
export default HeadingModal;