import { convertFromRaw, convertToRaw, EditorState, RawDraftContentState } from "draft-js";
import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { Editor } from "react-draft-wysiwyg";

export interface RichTextComponentProps {
  id: string;
  position: number;
  editorState: EditorState,
  updateRichTextContent: (content: EditorState, position: number) => void;
  className?: string;
  editorMode?: boolean;
}

const RichTextComponent: React.FC<RichTextComponentProps> = ({id, editorState, updateRichTextContent, position}) => {
  const [drag, preview] = useDrag(
    () => ({
      type: "richText",
      item: {
        id,
        component: "richText",
        action: "reposition",
        // heading: heading,
        // detail: detail,
        position: position,
      },
    }),
    []
  );
  const onEditorStateChange = (newEditorState:EditorState) => {
    updateRichTextContent(newEditorState,position);
  };
  return (
    <div>
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

export default RichTextComponent;
