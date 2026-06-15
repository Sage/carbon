```tsx
export const UploadStatusClient: Story = () => {
  const [error, setError] = useState<string | undefined>();
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();
  const reader = useRef<FileReader>();

  const getReader = () => {
    if (!reader.current) {
      reader.current = new FileReader();
    }
    return reader.current;
  };

  const removeFile = () => setUploadStatus(undefined);

  const onChange = (files: FileList) => {
    if (!files.length) {
      setError(undefined);
      removeFile();
      return;
    }
    // as this is a single file input there will only ever be (at most) 1 file
    const fileUploaded = files[0];

    // abandon with error if the file is too big
    if (fileUploaded.size > 5 * 1024 * 1024) {
      setError("This file is too big to be uploaded - maximum size 5MB");
      return;
    }

    setError(undefined);

    const fileReader = getReader();

    const handleLoad = () => {
      const uploadProps: FileUploadStatusProps = {
        status: "uploading",
        filename: fileUploaded.name,
        onAction: () => fileReader.abort(),
        progress: 0,
      };
      setUploadStatus(uploadProps);
    };

    const handleProgress = (e: ProgressEvent) => {
      const progress = (100 * e.loaded) / e.total;
      const isComplete = e.type === "loadend" || progress >= 100;
      if (isComplete) {
        removeListeners();
      }
      const uploadProps: FileUploadStatusProps = isComplete
        ? {
            status: "completed",
            filename: fileUploaded.name,
            onAction: () => removeFile(),
            href: fileReader.result as string,
            message: "File uploaded",
          }
        : {
            status: "uploading",
            filename: fileUploaded.name,
            onAction: () => fileReader.abort(),
            progress,
            message: `${progress} percent uploaded`,
          };
      setUploadStatus(uploadProps);
    };

    const handleError = () => {
      const uploadProps: FileUploadStatusProps = {
        status: "error",
        filename: fileUploaded.name,
        onAction: () => removeFile(),
        message: "failed to upload",
      };
      setUploadStatus(uploadProps);
      removeListeners();
    };

    const handleAbort = () => {
      removeFile();
      removeListeners();
    };

    const removeListeners = () => {
      fileReader.removeEventListener("loadstart", handleLoad);
      fileReader.removeEventListener("load", handleLoad);
      fileReader.removeEventListener("loadend", handleProgress);
      fileReader.removeEventListener("progress", handleProgress);
      fileReader.removeEventListener("error", handleError);
      fileReader.removeEventListener("abort", handleAbort);
    };

    fileReader.addEventListener("loadstart", handleLoad);
    fileReader.addEventListener("load", handleProgress);
    fileReader.addEventListener("loadend", handleProgress);
    fileReader.addEventListener("progress", handleProgress);
    fileReader.addEventListener("error", handleError);
    fileReader.addEventListener("abort", handleAbort);

    fileReader.readAsDataURL(fileUploaded);
  };

  return (
    <FileInput
      label="Upload status example"
      inputHint="Maximum size 5MB"
      onChange={onChange}
      uploadStatus={uploadStatus}
      error={error}
    />
  );
};
```