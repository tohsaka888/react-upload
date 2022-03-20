import React, { useCallback, useReducer, useState } from "react";
import { AiOutlineUpload, AiOutlineCheck } from "react-icons/ai";
import FileViewer from "react-file-viewer";
import {
  UploadArea,
  UploadContainer,
  TextArea,
  FileListContainer,
  FileListItem,
  FilenName,
} from "./styles/index";
import { FilePreviewer } from "./type";

type ActionType =
  | { type: "show"; payload: File }
  | { type: "add"; payload: { file: File; fileType: string } };

const reducer = (state: FilePreviewer, action: ActionType) => {
  switch (action.type) {
    case "show":
      return { ...state, isShow: !state.isShow };
    case "add":
      console.log(action.payload.file);
      return {
        isShow: true,
        file: action.payload.file,
        fileType: action.payload.fileType,
      };
  }
};

const initialState: FilePreviewer = {
  fileType: "",
  isShow: false,
};

function App() {
  const [fileList, setFileList] = useState<File[]>([]);
  const [filePreviewer, dispatch] = useReducer(reducer, initialState);
  const uploadFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        Array.from(files).forEach((file) =>
          setFileList((fileList) => [...fileList, file])
        );
      }
    },
    []
  );

  return (
    <>
      <UploadContainer>
        <UploadArea type={"file"} multiple onChange={uploadFile} />
        <AiOutlineUpload />
        <TextArea>Upload</TextArea>
      </UploadContainer>
      <FileListContainer>
        {fileList.map((file, index) => (
          <FileListItem key={index}>
            <AiOutlineCheck style={{ color: "#52c41a" }} />
            <FilenName
              onClick={() => {
                const fileType = file.name.split(".")[1];
                console.log(fileType);
                if (filePreviewer.file?.name === file.name) {
                  dispatch({ type: "show", payload: file });
                } else {
                  dispatch({ type: "add", payload: { file, fileType } });
                }
              }}
            >
              {file.name}
            </FilenName>
          </FileListItem>
        ))}
      </FileListContainer>
      {filePreviewer.isShow && filePreviewer.file && (
        <FileViewer
          fileType={filePreviewer.fileType}
          filePath={window.URL.createObjectURL(filePreviewer.file)}
        />
      )}
    </>
  );
}

export default App;
