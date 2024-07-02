"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import * as Y from "yjs";
import Editor from "@/components/Editor";

export default function Documents({ params }: { params: { docId: string } }) {
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
  const [collabToken, setCollabToken] = useState<string | null>(null);
  const ydoc = useMemo(() => new Y.Doc(), []);

  const { docId } = params;

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch("/api/collaboration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      const { token } = data;

      // set state when the data received
      setCollabToken(token);
    };

    dataFetch();
  }, []);

  useLayoutEffect(() => {
    if (collabToken) {
      setProvider(
        new TiptapCollabProvider({
          name: `${process.env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}${docId}`,
          appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? "",
          token: collabToken,
          document: ydoc,
        })
      );
    }
  }, [collabToken, docId, ydoc]);

  return (
    <div>
      <Editor ydoc={ydoc} provider={provider} />
    </div>
  );
}
