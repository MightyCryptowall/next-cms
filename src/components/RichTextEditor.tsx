import { useDrag } from "react-dnd";
import { Editor } from "react-draft-wysiwyg";

export interface RichTextEditorProps {}

const RichTextEditor: React.FC<RichTextEditorProps> = () => {
  return (
    <div>
      <Editor
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
