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
import "./App.css";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";

type ActionType =
  | { type: "show"; payload: null }
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
                  dispatch({ type: "show", payload: null });
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
      <Modal
        isOpen={filePreviewer.isShow}
        onClose={() => dispatch({ type: "show", payload: null })}
      >
        <ModalOverlay />
        <ModalContent
          minW={"600px"}
          minH={"700px"}
          maxH={"700px"}
          overflowY={"scroll"}
        >
          <ModalHeader>
            预览 {filePreviewer.file?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            w={"100%"}
            margin={0}
            padding={0}
          >
            {filePreviewer.isShow && filePreviewer.file && (
              <FileViewer
                key={window.URL.createObjectURL(filePreviewer.file)}
                fileType={filePreviewer.fileType}
                filePath={window.URL.createObjectURL(filePreviewer.file)}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* {filePreviewer.isShow && filePreviewer.file && (
        <FileViewer
          key={window.URL.createObjectURL(filePreviewer.file)}
          fileType={filePreviewer.fileType}
          filePath={window.URL.createObjectURL(filePreviewer.file)}
        />
      )} */}
    </>
  );
}

export default App;
