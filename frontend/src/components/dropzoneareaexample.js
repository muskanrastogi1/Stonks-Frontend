import { DropzoneArea } from "material-ui-dropzone";
import React, { useState } from "react";
import "./dropzoneareaexample.css";
import {
  AttachFile,
  AudioTrack,
  Description,
  PictureAsPdf,
  Theaters,
} from "@material-ui/icons";
const DropzoneAreaExample = (props) => {
  const [files, setFiles] = useState([]);

  const handleChange = (files) => {
    if (files[0]) {
      props.pass(files);
    }
  };

  const handlePreviewIcon = (fileObject, classes) => {
    const { type } = fileObject.file;
    const iconProps = {
      className: classes.image,
    };

    switch (type) {
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <Description {...iconProps} />;
      case "application/pdf":
        return <PictureAsPdf {...iconProps} />;
      default:
        return <AttachFile {...iconProps} />;
    }
  };

  return (
    <DropzoneArea
      getPreviewIcon={handlePreviewIcon}
      onChange={handleChange}
      filesLimit={1}
      showFileNames={true}
      dropzoneText={"Drag and drop a financial report here or click"}
    />
  );
};

export default DropzoneAreaExample;
