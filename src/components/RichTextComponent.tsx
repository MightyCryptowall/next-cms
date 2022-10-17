import { useDrag } from "react-dnd";
import { Editor } from "react-draft-wysiwyg";

export interface RichTextComponentProps {
  id: string;
  position: number;
  className?: string;
  editorMode?: boolean;
}

const RichTextComponent: React.FC<RichTextComponentProps> = ({id, position}) => {
  const [drag, preview] = useDrag(
    () => ({
      type: "accordion",
      item: {
        id,
        component: "accordion",
        action: "reposition",
        // heading: heading,
        // detail: detail,
        position: position,
      },
    }),
    []
  );
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

export default RichTextComponent;
