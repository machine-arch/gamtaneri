import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

const CkaEditor = () => {
  console.log("rame")
  return (
    <div>
    <CKEditor
      editor={Editor}
      data="<p>Hello from CKEditor 5!</p>"
      onInit={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
    ></CKEditor>
    </div>
  );
};

export default CkaEditor;
