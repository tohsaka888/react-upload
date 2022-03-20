import React, { useCallback, useState } from "react";
import { AiOutlineUpload, AiOutlineCheck } from "react-icons/ai";
import {
  UploadArea,
  UploadContainer,
  TextArea,
  FileListContainer,
  FileListItem,
  FilenName,
} from "./styles/index";

function App() {
  const [fileList, setFileList] = useState<File[]>([]);
  const [file, setFile] = useState<File>();
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
                setFile(file);
              }}
            >
              {file.name}
            </FilenName>
          </FileListItem>
        ))}
      </FileListContainer>
    </>
  );
}

export default App;
