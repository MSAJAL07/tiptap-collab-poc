import { useRef } from "react";
import { EditorContent, PureEditorContent } from "@tiptap/react";
import { TiptapProps } from "./type";
import { useBlockEditor } from "@/hooks/useBlockEditor";

export default function Editor({ ydoc, provider }: TiptapProps) {
  const editorRef = useRef<PureEditorContent | null>(null);
  const { editor, users, characterCount, collabState } = useBlockEditor({
    ydoc,
    provider,
  });

  return (
    <EditorContent
      editor={editor}
      ref={editorRef}
      className="flex-1 overflow-y-auto"
    />
  );
}
