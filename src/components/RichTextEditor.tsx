import { convertToRaw, EditorState } from "draft-js";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { Editor } from "react-draft-wysiwyg";

export interface RichTextEditorProps {}

const RichTextEditor: React.FC<RichTextEditorProps> = () => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const onEditorStateChange = (newEditorState:EditorState) => {
    setEditorState(newEditorState);
  };
  return (
    <div>
      <button type="button" onClick={() => {
        console.log(convertToRaw(editorState.getCurrentContent()));
      }}>Log State</button>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "image",
            "history",
          ],
          inline: {
            inDropdown: false,
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "superscript",
              "subscript",
            ],
          },
          list: {
            inDropdown: true,
            options: ["unordered", "ordered", "indent", "outdent"],
          },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }}
      />
    </div>
  );
};

export default RichTextEditor;
