import styles from "styles/Modal.module.scss";
import Image from "next/image";

interface ModalProps {
  
}


 
const Modal: React.FC<ModalProps> = () => {
  return ( 
    <div className={styles["screen"]}>
      <div className={styles["container"]}>
        <div className={styles["modal"]}>
          <div>
            <h3>Components</h3>
            <ul className={styles["icons-list"]}>
              <li className={styles["icon-container"]}>
                <Image src="https://sbn-bucket.s3.ap-south-1.amazonaws.com/accordion-icon.png" width="100" height="100" alt="accordion icon" />
              </li>
              <li className={styles["icon-container"]}>
                <Image src="https://sbn-bucket.s3.ap-south-1.amazonaws.com/button-icon.png" width="100" height="100" alt="accordion icon" />
              </li>
              <li className={styles["icon-container"]}>
                <Image src="https://sbn-bucket.s3.ap-south-1.amazonaws.com/rich-text-icon.png" width="100" height="100" alt="accordion icon" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
   );
}


 
export default Modal;