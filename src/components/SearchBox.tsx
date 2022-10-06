import { FaSearch } from "react-icons/fa";
import styles from "styles/SearchBox.module.scss";

interface SearchBoxProps {}
 
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
 
export default SearchBox;