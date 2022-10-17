import { Editor } from 'react-draft-wysiwyg';
export interface RichTextEditorProps {
  
}
 
const RichTextEditor: React.FC<RichTextEditorProps> = () => {
  return ( 
    <div>
      <Editor />
    </div>
   );
}
 
export default RichTextEditor;