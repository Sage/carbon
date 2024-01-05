import React from "react";
import FileInput, { FileInputProps } from ".";

export default (props: Partial<FileInputProps>) => {
  return <FileInput label="File input" onChange={() => {}} {...props} />;
};
