import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@mkhatiashvili/gamtaneri-ckeditor5-custom-build/build/ckeditor";
import { useState, useContext, FC, useEffect, useRef } from "react";
import {
  editorContext,
  editorContextInterface,
} from "../../context/admin/editor.context";

/**
 *
 * @param props
 * @returns
 */

const CkaEditor: FC<any> = (props) => {
  const editorObject: editorContextInterface = useContext(editorContext);
  const editorConfig = {
    language: props?.editorLocale,
    placeholder: props?.editorPlaceholder,
  };

  return (
    <div>
      <CKEditor
        editor={Editor}
        data={
          props?.editorLocale === "ka"
            ? editorObject.editorDateGeo
            : editorObject.editorDataEng
        }
        config={editorConfig}
        onChange={(event, editor) => {
          const editorData = editor.getData();
          if (props?.editorLocale === "ka") {
            editorObject.editorDateGeo = editorData;
          } else if (props?.editorLocale === "en") {
            editorObject.editorDataEng = editorData;
          }
        }}
      ></CKEditor>
    </div>
  );
};

export default CkaEditor;
