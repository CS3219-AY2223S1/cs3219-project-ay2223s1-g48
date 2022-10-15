// YJS with React.JS using y-webrtc
import React, { useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { CodemirrorBinding } from "y-codemirror";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/keymap/sublime";

const prefix = "3fd842948a66b1399bd01ed143b1b4ea";
const pass = "c7d4d3529df7ae0f0a74c2b032d51445";

export default function Editor(props) {
  useEffect(() => {
    const ydoc = new Y.Doc();

    console.log("room id is " + props.matchedRoomId);
    console.log("username is " + props.username);

    const provider = new WebrtcProvider(prefix + props.matchedRoomId, ydoc, {
      password: pass,
    });

    const yText = ydoc.getText("codemirror");
    const yUndoManager = new Y.UndoManager(yText);

    const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
      mode: "javascript",
      lineNumbers: true,
      // keyMap: "sublime",
      indentWithTabs: true,
      //theme: "material-ocean",
    });

    editor.setSize("100%", "70vh");

    const awareness = provider.awareness;

    awareness.setLocalStateField("user", {
      name: props.username,
      color: "#ffb61e",
    });

    const binding = new CodemirrorBinding(yText, editor, provider.awareness, {
      yUndoManager,
    });

    return () => {
      // react cleanup
      if (provider) {
        provider.disconnect();

        ydoc.destroy();
      }
    };
  }, []);

  return (
    <div>
      <textarea id="editor"></textarea>
    </div>
  );
}
