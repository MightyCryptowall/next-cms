import { LegacyRef, useEffect, useRef } from "react";
import styles from "styles/AccordionModal.module.scss"

interface AccordionModalProps {
  position: number,
  title: string,
  detail: string,
  active: boolean,
  onSave: (position: number, title: string, detail: string) => void;
  onCancel: () => void;
}
 
const AccordionModal: React.FC<AccordionModalProps> = ({position, title, detail, active, onSave, onCancel}) => {
  const titleRef: LegacyRef<HTMLInputElement> | undefined = useRef(null);
  const detailRef: LegacyRef<HTMLTextAreaElement> | undefined = useRef(null);

  const handleSave = () => {
    const titleValue = titleRef.current?.value as string;
    const detailValue = detailRef.current?.value as string;
    onSave(position,titleValue,detailValue);
  }

  useEffect(() => {
    const titleInput = titleRef.current as HTMLInputElement;
    titleInput.value = title;
    const detailInput = detailRef.current as HTMLTextAreaElement;
    detailInput.value = detail;
    
  },[position,title, detail])

  return ( 
    <div className={[styles["container"], active ? styles["active"] : ""].join(" ")}>
      <form className={styles["accordion-modal"]}>
        <h3>Accordion</h3>
        <input name="title" type="text" placeholder="Title" ref={titleRef} />
        <textarea name="detail" id="" placeholder="Detail" rows={7} ref={detailRef}></textarea>
        <div className={styles["controls"]}>
          <button className={styles["save"]} onClick={handleSave} type="button">Save</button>
          <button className={styles["cancel"]} onClick={onCancel} type="button">Cancel</button>
        </div>
      </form>
    </div>
   );
}
 
export default AccordionModal;