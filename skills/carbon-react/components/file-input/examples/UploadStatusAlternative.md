```tsx
export const UploadStatusAlternative: Story = () => {
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();

  const removeFile = () => setUploadStatus(undefined);

  const onChange = (files: FileList) => {
    if (!files.length) {
      removeFile();
      return;
    }
    // as this is a single file input there will only ever be (at most) 1 file
    const fileUploaded = files[0];

    setUploadStatus({
      status: "uploading",
      filename: fileUploaded.name,
      onAction: () => {
        // in practice you might need to send a new request to the server here to ensure nothing of the file gets stored
        removeFile();
      },
      progress: 0,
    });

    // mock progress, and possibility of error, at regular intervals. In practice you could poll an endpoint to monitor progress,
    // or use a WebSocket connection for the server to give regular updates.
    const interval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 20);
      // mock possibility of server error
      if (randomNumber === 0) {
        setUploadStatus({
          status: "error",
          filename: fileUploaded.name,
          onAction: () => {
            // in practice you might need to send a new request to the server here to ensure nothing of the file gets stored
            removeFile();
          },
          message:
            "something went wrong with uploading the file - please try again",
        });
        clearInterval(interval);
      } else {
        setUploadStatus((currentStatus) => {
          if (currentStatus?.status !== "uploading") {
            return currentStatus;
          }
          const currentProgress = currentStatus.progress as number;
          const newProgress = currentProgress + randomNumber;
          if (newProgress >= 100) {
            clearInterval(interval);
            return {
              status: "completed",
              filename: fileUploaded.name,
              onAction: () => {
                // in practice you might need to send a new request to the server here to ensure nothing of the file gets stored
                removeFile();
              },
              href: "https://carbon.sage.com/", // real href will be whatever URL the file is stored at
              message: "File uploaded",
            };
          }
          return {
            ...currentStatus,
            progress: newProgress,
            message: `${newProgress} percent uploaded`,
          };
        });
      }
    }, 100);
  };

  return (
    <FileInput
      label="Upload status example"
      onChange={onChange}
      uploadStatus={uploadStatus}
    />
  );
};
```