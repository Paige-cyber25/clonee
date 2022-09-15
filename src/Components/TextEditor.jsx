import React from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextEditor = ({ value, setValue }) => {
  return (
    <CKEditor
      data={(value ? value : '')}
      editor={ClassicEditor}
      onReady={(editor) => {
        // console.log(editor)
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setValue(data)
        // console.log(event);
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
        // console.log(event);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
        // console.log(event);
      }}
    />
  );
};

export default TextEditor;
