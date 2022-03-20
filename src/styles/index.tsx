import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const UploadContainer = styled(Flex)`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
  background-color: #1890ff;
  width: max-content;
  padding: 6.4px 20px;
  border-radius: 40px;
  color: white;
  position: relative;
`;

const UploadArea = styled.input`
  opacity: 0;
  z-index: 100;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

const TextArea = styled.div`
  z-index: 0;
  margin-left: 3px;
`;

const FileListContainer = styled.div`
  padding: 8px 0px;
`;

const FileListItem = styled(Flex)`
  margin-bottom: 2px;
`;

const FilenName = styled.div`
  margin-left: 8px;
  cursor: pointer;
  :hover {
    border-bottom: 1px solid #1890ff;
    color: #1890ff;
  }
`;

export {
  FileListContainer,
  FileListItem,
  FilenName,
  TextArea,
  UploadArea,
  UploadContainer,
};
