import dynamic from "next/dynamic";
import { RichTextEditorProps } from "src/components/RichTextEditor";

interface WYSIWYGProps {
  
}

const RichTextEditor = dynamic<RichTextEditorProps>(
  () => import("components/RichTextEditor"),
  { ssr: false }
);
 
const WYSIWYG: React.FC<WYSIWYGProps> = () => {
  return ( 
    <RichTextEditor/>
   );
}
 
export default WYSIWYG;