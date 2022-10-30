// YJS with React.JS using y-webrtc
import React, { useEffect, useRef, useState } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { CodemirrorBinding } from 'y-codemirror';
import { WebrtcProvider } from 'y-webrtc';
import { CodemirrorBinding } from 'y-codemirror';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-ocean.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import 'codemirror/keymap/sublime';

const prefix = process.env.PREFIX;
const pass = process.env.PASS;

export default function Editor(props) {
  const [EditorRef, setEditorRef] = useState('');

  const handleLanguageChange = (e) => {
    EditorRef.setOption('mode', e.target.value);
  };

  useEffect(() => {
    const ydoc = new Y.Doc();

    console.log('room id is ' + props.matchedRoomId);
    console.log('username is ' + props.username);

    // const provider = new WebrtcProvider(prefix + props.matchedRoomId, ydoc, {
    //   password: pass,
    //   signaling: [
    //     'wss://signaling.yjs.dev',
    //     'wss://y-webrtc-signaling-eu.herokuapp.com',
    //     'wss://y-webrtc-signaling-us.herokuapp.com',
    //   ],
    // });
    const provider = new WebsocketProvider(
      'wss://collab-service.herokuapp.com:54451',
      prefix + props.matchedRoomId,
      ydoc
    );

    provider.on('status', (event) => {
      console.log(event.status); // logs "connected" or "disconnected"
    });

    const yText = ydoc.getText('codemirror');
    const yUndoManager = new Y.UndoManager(yText);

    const editor = CodeMirror(document.getElementById('editor'), {
      mode: 'javascript',
      lineNumbers: true,
      // keyMap: "sublime",
      indentWithTabs: true,
      theme: '3024-day',
    });

    editor.setSize('47vw', '70vh');

    const awareness = provider.awareness;

    awareness.setLocalStateField('user', {
      name: props.username,
      color: '#ffb61e',
    });

    const binding = new CodemirrorBinding(yText, editor, provider.awareness, {
      yUndoManager,
    });

    setEditorRef(editor);

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
      <select onChange={handleLanguageChange}>
        <option value="javascript">javascript</option>
        <option value="text/x-java">java</option>
        <option value="python">python</option>
      </select>
      <div id="editor"></div>
    </div>
  );
}
