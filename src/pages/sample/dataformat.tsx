import { convertFromRaw, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { ComponentProps } from "./[...edit]";

interface DataFormatProps {
  
}
const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
const DataFormat: React.FC<DataFormatProps> = () => {
  const [format, setFormat] = useState<any>();
  useEffect(() => {
    const storedData = localStorage.getItem("page-data");
    if(storedData){
      let storedComponents = JSON.parse(storedData) as any[];
      storedComponents = storedComponents.map(item => {
        if(item.componentType == "richText"){
          delete item.editorState;
          return item;
        }else{
          return item;
        }
      }) as any[];
      console.log(storedComponents);
      setFormat(storedComponents);
    }
  },[])
  return ( 
    <div>
      <pre>{JSON.stringify(format, null, 2)}</pre>
    </div>

   );
}
 
export default DataFormat;