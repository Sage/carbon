---
name: carbon-component-file-input
description: Carbon FileInput component props and usage examples.
---

# FileInput

## Import
`import FileInput from "carbon-react/lib/components/file-input";`

## Source
- Export: `./components/file-input`
- Props interface: `FileInputProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| onChange | (files: FileList) => void | Yes |  |  |  | Called when files are selected or dropped, with all received files. |  |
| accept | string \| undefined | No |  |  |  | File type(s) used by the native file picker through the HTML input's `accept` attribute. Consumers must validate dropped files. |  |
| buttonText | string \| undefined | No |  |  |  | Text displayed on the button that opens the native file picker. |  |
| disabled | boolean \| undefined | No |  |  |  | Disables file selection and dropping files onto the drop zone. |  |
| dragAndDropText | string \| undefined | No |  |  |  | Supporting text displayed in the drop zone. Defaults to the localized instruction to drag and drop files. |  |
| error | string \| boolean \| undefined | No |  |  |  | Indicate that error has occurred. |  |
| id | string \| undefined | No |  |  |  | HTML id attribute of the input |  |
| inputHint | React.ReactNode | No |  |  |  | Help content displayed beneath the label and associated with the input. |  |
| isVertical | boolean \| undefined | No |  |  |  | Controls the drop-zone layout. Defaults to `true`, which stacks its contents vertically; set to `false` for a horizontal layout. |  |
| label | string \| undefined | No |  |  |  | Visible label for the native file input. |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| maxHeight | string \| undefined | No |  |  |  | Maximum height of the drop zone, as a valid CSS value. |  |
| maxWidth | string \| undefined | No |  |  |  | Maximum width of the drop zone, as a valid CSS value. Defaults to the value of `minWidth`. |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| minHeight | string \| undefined | No |  |  |  | Minimum height of the drop zone, as a valid CSS value. |  |
| minWidth | string \| undefined | No |  |  |  | Minimum width of the drop zone, as a valid CSS value. Defaults to `"288px"`. |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| multiple | boolean \| undefined | No |  |  |  | Controls single-file vs multi-file behavior. Defaults to `false`, which restricts the native picker to one file; the Drop zone remains available alongside file cards in either mode so a replacement can be selected. |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| name | string \| undefined | No |  |  |  | Name of the input |  |
| required | boolean \| undefined | No |  |  |  | Marks the native file input as required. |  |
| uploadStatus | FileUploadStatusProps \| FileUploadStatusProps[] \| undefined | No |  |  |  | Status item(s) displayed alongside the picker for files that are uploading, completed, previously uploaded, or in error. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Yes | Validation messages render below the drop zone. |  |  |

## Examples
### Default

**Render**

```tsx
() => {
  return <FileInput label="File input" onChange={() => {}} />;
}
```


### With Input Hint

**Render**

```tsx
() => {
  return (
    <FileInput label="File input" inputHint="Hint text" onChange={() => {}} />
  );
}
```


### Required

**Render**

```tsx
() => {
  return <FileInput label="File input" required onChange={() => {}} />;
}
```


### Required Field Validation

**Render**

```tsx
() => {
  const [error, setError] = useState<string | undefined>(
    "The file is required and no file has been uploaded on submission.",
  );
  const onChange = (files: FileList) => {
    if (files.length > 0) setError(undefined);
  };
  return (
    <FileInput label="File input" required error={error} onChange={onChange} />
  );
}
```


### Increased Height

**Render**

```tsx
() => {
  return (
    <FileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      minHeight="200px"
      onChange={() => {}}
    />
  );
}
```


### Responsive Width

**Render**

```tsx
() => {
  return (
    <FileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      maxWidth="min(800px, 100%)"
      minWidth="250px"
      onChange={() => {}}
    />
  );
}
```


### Increased Width and Height

**Render**

```tsx
() => {
  return (
    <FileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      maxWidth="500px"
      minHeight="200px"
      onChange={() => {}}
    />
  );
}
```


### Full Width

**Render**

```tsx
() => {
  return <FileInput label="File input" maxWidth="100%" onChange={() => {}} />;
}
```


### Layout

**Render**

```tsx
() => {
  return (
    <>
      <FileInput label="Vertical (default)" onChange={() => {}} />
      <FileInput
        label="Horizontal"
        isVertical={false}
        maxWidth="450px"
        onChange={() => {}}
      />
    </>
  );
}
```


### File Type Validation

**Render**

```tsx
() => {
  const [error, setError] = useState<string | undefined>();
  const onChange = (files: FileList) => {
    let errorMessage;
    if (files.length > 0) {
      const fileType = files[0].type;
      if (!fileType.startsWith("image/")) {
        errorMessage = "Please choose an image file to upload";
      }
    }
    setError(errorMessage);
  };
  return (
    <FileInput
      label="Only accepts image files"
      accept="image/*"
      error={error}
      onChange={onChange}
    />
  );
}
```


### Single File

**Render**

```tsx
() => {
  const [error, setError] = useState<string | undefined>();
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();
  const objectUrlRef = useRef<string>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const removeFile = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = undefined;
    }
    setUploadStatus(undefined);
  };

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    [],
  );

  const onChange = (files: FileList) => {
    if (files.length > 1) {
      setError("Select only one file");
      return;
    }
    const fileUploaded = files[0];
    if (!fileUploaded) return;

    if (!ACCEPTED_FILE_TYPES.includes(fileUploaded.type)) {
      setError("Select a jpg, png, or pdf file");
      return;
    }
    if (fileUploaded.size > MAX_FILE_SIZE_BYTES) {
      setError("Select a file smaller than 500KB");
      return;
    }

    setError(undefined);
    removeFile();
    const objectUrl = URL.createObjectURL(fileUploaded);
    objectUrlRef.current = objectUrl;
    const thumbnailSrc = fileUploaded.type.startsWith("image/")
      ? objectUrl
      : undefined;
    setUploadStatus({
      status: "uploading",
      filename: fileUploaded.name,
      onCancel: removeFile,
      progress: 0,
      message: "0% uploaded",
      thumbnailSrc,
    });

    const interval = setInterval(() => {
      setUploadStatus((currentStatus) => {
        if (currentStatus?.status !== "uploading") return currentStatus;
        const newProgress = (currentStatus.progress as number) + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          if (intervalRef.current === interval) {
            intervalRef.current = undefined;
          }
          return {
            status: "completed",
            filename: fileUploaded.name,
            onDelete: removeFile,
            message: "File uploaded",
            thumbnailSrc,
            href: objectUrl,
            target: "_blank",
            rel: "noreferrer",
          };
        }
        return {
          ...currentStatus,
          progress: newProgress,
          message: `${newProgress}% uploaded`,
        };
      });
    }, 200);
    intervalRef.current = interval;
  };

  return (
    <FileInput
      label="Upload invoice document"
      inputHint="Maximum size: 500KB. Supported file types: jpg, png, pdf."
      required
      multiple={false}
      accept="image/jpeg,image/png,application/pdf"
      buttonText="Select file"
      dragAndDropText="or drag and drop your file"
      onChange={onChange}
      error={error}
      uploadStatus={uploadStatus}
    />
  );
}
```


### Multiple Files

**Render**

```tsx
() => {
  const [items, setItems] = useState<FileUploadStatusProps[]>(initialItems);
  const intervals = useRef<Record<string, ReturnType<typeof setInterval>>>({});
  const objectUrls = useRef<Record<string, string>>({});

  const removeItem = (id: string) => {
    clearInterval(intervals.current[id]);
    delete intervals.current[id];
    if (objectUrls.current[id]) {
      URL.revokeObjectURL(objectUrls.current[id]);
      delete objectUrls.current[id];
    }
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const runUpload = (
    id: string,
    filename: string,
    shouldFail: boolean,
    thumbnailSrc: string | undefined,
    objectUrl: string,
  ) => {
    intervals.current[id] = setInterval(() => {
      setItems((current) =>
        current.map((item) => {
          if (item.id !== id || item.status !== "uploading") return item;
          const newProgress = (item.progress ?? 0) + 20;
          if (shouldFail && newProgress >= 40) {
            clearInterval(intervals.current[id]);
            return {
              id,
              status: "error",
              filename,
              onRemove: () => removeItem(id),
              onRetry: () => {
                setItems((withRetry) =>
                  withRetry.map((retryItem) =>
                    retryItem.id === id
                      ? {
                          id,
                          status: "uploading",
                          filename,
                          onCancel: () => removeItem(id),
                          progress: 0,
                          message: "0% uploaded",
                          thumbnailSrc,
                        }
                      : retryItem,
                  ),
                );
                // Retrying always succeeds, so the demo has a clear end state.
                runUpload(id, filename, false, thumbnailSrc, objectUrl);
              },
              thumbnailSrc,
              message: "Upload failed - check your connection and try again",
            };
          }
          if (newProgress >= 100) {
            clearInterval(intervals.current[id]);
            return {
              id,
              status: "completed",
              filename,
              onDelete: () => removeItem(id),
              thumbnailSrc,
              href: objectUrl,
              target: "_blank",
              rel: "noreferrer",
              message: "File uploaded",
            };
          }
          return {
            ...item,
            id,
            progress: newProgress,
            message: `${newProgress}% uploaded`,
          };
        }),
      );
    }, 400);
  };

  const onChange = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const id = `multi-file-${multipleFilesIdCounter}`;
      multipleFilesIdCounter += 1;
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setItems((current) => [
          ...current,
          {
            id,
            status: "error",
            filename: file.name,
            onRemove: () => removeItem(id),
            message: "This file type is not supported",
          },
        ]);
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      objectUrls.current[id] = objectUrl;
      const thumbnailSrc = file.type.startsWith("image/")
        ? objectUrl
        : undefined;
      setItems((current) => [
        ...current,
        {
          id,
          status: "uploading",
          filename: file.name,
          onCancel: () => removeItem(id),
          progress: 0,
          message: "0% uploaded",
          thumbnailSrc,
        },
      ]);
      const shouldFail = file.type === SIMULATED_UPLOAD_ERROR_TYPE;
      runUpload(id, file.name, shouldFail, thumbnailSrc, objectUrl);
    });
  };

  return (
    <FileInput
      label="Upload supporting documents"
      inputHint="jpg, png, or pdf"
      multiple
      accept="image/jpeg,image/png,application/pdf"
      onChange={onChange}
      uploadStatus={items}
    />
  );
}
```


### Scrollable Status List

**Render**

```tsx
() => (
  <Box width="500px" height="600px">
    <FileInput
      label="Uploaded supporting documents"
      multiple
      onChange={() => {}}
      uploadStatus={scrollableStatusItems}
    />
  </Box>
)
```


### Upload Error Summary

**Render**

```tsx
() => (
  <FileInput
    label="Supporting documents"
    multiple
    onChange={() => {}}
    uploadStatus={errorStatusSummaryItems}
  />
)
```


### Upload Status (Tracked)

**Render**

```tsx
() => {
  const [error, setError] = useState<string | undefined>();
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >({
    status: "uploading",
    filename: "example.pdf",
    progress: 56,
    message: "Loaded 56%",
    onAction: () => setUploadStatus(undefined),
  });
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
    const fileUploaded = files[0];

    if (fileUploaded.size > 5 * 1024 * 1024) {
      setError("This file is too big to be uploaded - maximum size 5MB");
      return;
    }

    setError(undefined);

    const fileReader = getReader();

    const handlers: {
      handleLoad: () => void;
      handleProgress: (event: ProgressEvent) => void;
      handleError: () => void;
      handleAbort: () => void;
    } = {
      handleLoad: () => {},
      handleProgress: () => {},
      handleError: () => {},
      handleAbort: () => {},
    };

    const removeListeners = () => {
      fileReader.removeEventListener("loadstart", handlers.handleLoad);
      fileReader.removeEventListener("load", handlers.handleLoad);
      fileReader.removeEventListener("loadend", handlers.handleProgress);
      fileReader.removeEventListener("progress", handlers.handleProgress);
      fileReader.removeEventListener("error", handlers.handleError);
      fileReader.removeEventListener("abort", handlers.handleAbort);
    };

    handlers.handleLoad = () => {
      const uploadProps: FileUploadStatusProps = {
        status: "uploading",
        filename: fileUploaded.name,
        onAction: () => fileReader.abort(),
        progress: 0,
      };
      setUploadStatus(uploadProps);
    };

    handlers.handleProgress = (e: ProgressEvent) => {
      const progress = Math.round((100 * e.loaded) / e.total);
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

    handlers.handleError = () => {
      const uploadProps: FileUploadStatusProps = {
        status: "error",
        filename: fileUploaded.name,
        onAction: () => removeFile(),
        message: "failed to upload",
      };
      setUploadStatus(uploadProps);
      removeListeners();
    };

    handlers.handleAbort = () => {
      removeFile();
      removeListeners();
    };

    fileReader.addEventListener("loadstart", handlers.handleLoad);
    fileReader.addEventListener("load", handlers.handleProgress);
    fileReader.addEventListener("loadend", handlers.handleProgress);
    fileReader.addEventListener("progress", handlers.handleProgress);
    fileReader.addEventListener("error", handlers.handleError);
    fileReader.addEventListener("abort", handlers.handleAbort);

    fileReader.readAsDataURL(fileUploaded);
  };

  return (
    <FileInput
      label="Upload status example"
      inputHint="Maximum size 5MB"
      multiple={false}
      onChange={onChange}
      uploadStatus={uploadStatus}
      error={error}
    />
  );
}
```


### Upload Status (Untracked)

**Render**

```tsx
() => {
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >({
    status: "uploading",
    filename: "foo.pdf",
    onCancel: () => setUploadStatus(undefined),
  });
  return (
    <FileInput
      label="Upload status example"
      multiple={false}
      uploadStatus={uploadStatus}
      onChange={() => {}}
    />
  );
}
```


### With Thumbnail

**Render**

```tsx
() => {
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >({
    status: "completed",
    filename: "receipt.png",
    onDelete: () => setUploadStatus(undefined),
    href: "http://carbon.sage.com/",
    target: "_blank",
    rel: "noreferrer",
    message: "File uploaded",
    thumbnailSrc: THUMBNAIL_SRC,
  });
  return (
    <FileInput
      label="Upload a receipt"
      multiple={false}
      uploadStatus={uploadStatus}
      onChange={() => {}}
    />
  );
}
```


### Previously Uploaded

**Render**

```tsx
() => {
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatusProps>({
    status: "previously",
    filename: "vendor-agreement.pdf",
    href: "http://carbon.sage.com/",
    target: "_blank",
    rel: "noreferrer",
    message: "Uploaded by Jane Doe on 4 Sep 2026",
  });

  const onChange = (files: FileList) => {
    const fileUploaded = files[0];
    if (!fileUploaded) return;
    setUploadStatus({
      status: "completed",
      filename: fileUploaded.name,
      onDelete: () =>
        setUploadStatus({
          status: "previously",
          filename: "vendor-agreement.pdf",
          href: "http://carbon.sage.com/",
          target: "_blank",
          rel: "noreferrer",
          message: "Uploaded by Jane Doe on 4 Sep 2026",
        }),
      message: "File uploaded",
    });
  };

  return (
    <FileInput
      label="Upload invoice document"
      uploadStatus={uploadStatus}
      onChange={onChange}
    />
  );
}
```

