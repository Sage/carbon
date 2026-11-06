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
| buttonText | string \| undefined | No |  |  |  | Text displayed on the Select file button, which opens the native file picker. Defaults to the localized "Select file", or "Select files" when `multiple` is `true`. The default drag-and-drop instruction reuses this text. |  |
| disabled | boolean \| undefined | No |  |  |  | Disables file selection and dropping files onto the drop zone. |  |
| dragAndDropText | string \| undefined | No |  |  |  | Supporting text displayed in the drop zone. Defaults to the localized instruction to drag and drop files. |  |
| error | string \| boolean \| undefined | No |  |  |  | Indicates an error. A string is displayed as a validation message above the drop zone; `true` shows the error border without a message. Either marks the Select file button as invalid. |  |
| id | string \| undefined | No |  |  |  |  |  |
| inputHint | React.ReactNode | No |  |  |  | Help content displayed beneath the label and announced with the Select file button. |  |
| isVertical | boolean \| undefined | No |  |  |  | Controls the drop-zone layout. Defaults to `true`, which stacks its contents vertically; set to `false` for a horizontal layout. |  |
| label | string \| undefined | No |  |  |  | Visible label for the field. It also forms the Select file button's accessible name. |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| maxHeight | string \| undefined | No |  |  |  | Maximum height of the drop zone, as a valid CSS value. In single-file mode, it also applies to the status card that replaces the drop zone. In multiple-file mode, status cards size to their content. |  |
| maxWidth | string \| undefined | No |  |  |  | Maximum width of the drop zone and status cards, as a valid CSS value. When omitted, the component fills the available width of its container. |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| minHeight | string \| undefined | No |  |  |  | Minimum height of the drop zone, as a valid CSS value. In single-file mode, it also applies to the status card that replaces the drop zone. In multiple-file mode, status cards size to their content. |  |
| minWidth | string \| undefined | No |  |  |  | Minimum width of the drop zone and status cards, as a valid CSS value, capped at the width of the container. When omitted, the component may shrink to fit its container. |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| multiple | boolean \| undefined | No |  |  |  | Controls whether multiple files can be selected. Defaults to `false`, which hides the drop zone while a status card is present; set to `true` to keep the drop zone available alongside status cards. |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| name | string \| undefined | No |  |  |  |  |  |
| required | boolean \| undefined | No |  |  |  | Marks the field as required with a visual indicator and an accessible description on the Select file button. The hidden native input is not marked `required`, so browser validation never blocks form submission; validate on submit and supply `error` instead. |  |
| uploadStatus | FileUploadStatusProps \| FileUploadStatusProps[] \| undefined | No |  |  |  | Status card data for files that are uploading, completed, previously uploaded, or in error. Each item renders a card showing the filename, its state, and its actions. In single-file mode, a status card replaces the drop zone; in multiple-file mode, status cards are displayed alongside it. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Yes | No replacement: validation is shown above the drop zone by default, so omit this prop. `false`, which renders validation below the drop zone, is retained for existing consumers and will be removed in a future major release. |  |  |

## Examples
### Default

**Render**

```tsx
() => {
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();
  const [error, setError] = useState<string | undefined>();
  const onChange = (files: FileList) => {
    action("onChange")(files);
    if (files.length > 1) {
      setError("Select only one file");
      return;
    }
    const file = files[0];
    if (!file) return;
    setError(undefined);
    setUploadStatus({
      status: "completed",
      filename: file.name,
      onDelete: () => setUploadStatus(undefined),
    });
  };

  return (
    <FileInput
      label="File input"
      onChange={onChange}
      uploadStatus={uploadStatus}
      error={error}
    />
  );
}
```


### With Input Hint

**Render**

```tsx
() => {
  return <SelectedFileInput label="File input" inputHint="Hint text" />;
}
```


### Required

**Render**

```tsx
() => {
  return <SelectedFileInput label="File input" required />;
}
```


### Required Field Validation

**Render**

```tsx
() => {
  const requiredError =
    "The file is required and no file has been uploaded on submission.";
  const [error, setError] = useState<string | undefined>(requiredError);
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();
  const onChange = (files: FileList) => {
    const file = files[0];
    if (!file) return;

    setError(undefined);
    setUploadStatus({
      status: "completed",
      filename: file.name,
      message: "File uploaded",
      onDelete: () => {
        setUploadStatus(undefined);
        setError(requiredError);
      },
    });
  };
  return (
    <FileInput
      label="File input"
      required
      error={error}
      onChange={onChange}
      uploadStatus={uploadStatus}
    />
  );
}
```


### Increased Height

**Render**

```tsx
() => {
  return (
    <SelectedFileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      minHeight="200px"
    />
  );
}
```


### Width Constraints

**Render**

```tsx
() => {
  return (
    <SelectedFileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      maxWidth="min(800px, 100%)"
      minWidth="250px"
    />
  );
}
```


### Increased Width and Height

**Render**

```tsx
() => {
  return (
    <SelectedFileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      maxWidth="500px"
      minHeight="200px"
    />
  );
}
```


### Parent Container Widths

**Render**

```tsx
() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isChromatic());

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      minHeight={isChromatic() ? "900px" : undefined}
    >
      <div>
        <ParentContainerLabel>
          Inside a 400px-wide container
        </ParentContainerLabel>
        <ParentContainer $width="400px">
          <SelectedFileInput label="File input" />
        </ParentContainer>
      </div>
      <div>
        <ParentContainerLabel>Inside a Sidebar</ParentContainerLabel>
        <Button onClick={() => setIsSidebarOpen(true)}>
          Show file input in a sidebar
        </Button>
        <Sidebar
          aria-label="Upload documents"
          header="Upload documents"
          open={isSidebarOpen}
          onCancel={() => setIsSidebarOpen(false)}
        >
          <SidebarMultipleFileInput />
        </Sidebar>
      </div>
    </Box>
  );
}
```


### File Type Validation

**Render**

```tsx
() => {
  const [error, setError] = useState<string | undefined>();
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();
  const onChange = (files: FileList) => {
    action("onChange")(files);
    const file = files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file to upload");
      setUploadStatus(undefined);
      return;
    }
    setError(undefined);
    setUploadStatus({
      status: "completed",
      filename: file.name,
      message: "File uploaded",
      onDelete: () => setUploadStatus(undefined),
    });
  };
  return (
    <FileInput
      label="Only accepts image files"
      accept="image/*"
      error={error}
      onChange={onChange}
      uploadStatus={uploadStatus}
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
  const [customHeightUploadStatus, setCustomHeightUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();
  const objectUrlRef = useRef<string>();
  const customHeightObjectUrlRef = useRef<string>();
  const existingUploadObjectUrlRef = useRef<string>();
  const [existingUpload, setExistingUpload] = useState<
    { filename: string; href: string } | undefined
  >();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const previewFile = new File(
      [
        '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400"><rect width="100%" height="100%" fill="#f5f5f5"/><text x="50%" y="50%" text-anchor="middle" font-family="sans-serif" font-size="24">Document preview</text></svg>',
      ],
      "document-preview.svg",
      { type: "image/svg+xml" },
    );
    const href = URL.createObjectURL(previewFile);
    existingUploadObjectUrlRef.current = href;
    setExistingUpload({
      filename: previewFile.name,
      href,
    });

    return () => {
      if (existingUploadObjectUrlRef.current === href) {
        URL.revokeObjectURL(href);
        existingUploadObjectUrlRef.current = undefined;
      }
    };
  }, []);

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
      if (customHeightObjectUrlRef.current) {
        URL.revokeObjectURL(customHeightObjectUrlRef.current);
      }
      if (existingUploadObjectUrlRef.current) {
        URL.revokeObjectURL(existingUploadObjectUrlRef.current);
      }
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

  const existingUploadStatus: FileUploadStatusProps | undefined = existingUpload
    ? {
        status: "completed",
        filename: existingUpload.filename,
        href: existingUpload.href,
        target: "_blank",
        rel: "noreferrer",
        message: "File uploaded",
        onDelete: () => {
          if (existingUploadObjectUrlRef.current) {
            URL.revokeObjectURL(existingUploadObjectUrlRef.current);
            existingUploadObjectUrlRef.current = undefined;
          }
          setExistingUpload(undefined);
        },
      }
    : undefined;

  const onExistingUploadChange = (files: FileList) => {
    const fileUploaded = files[0];
    if (!fileUploaded) return;
    if (existingUploadObjectUrlRef.current) {
      URL.revokeObjectURL(existingUploadObjectUrlRef.current);
    }
    const href = URL.createObjectURL(fileUploaded);
    existingUploadObjectUrlRef.current = href;
    setExistingUpload({ filename: fileUploaded.name, href });
  };

  const onCustomHeightChange = (files: FileList) => {
    const fileUploaded = files[0];
    if (!fileUploaded) return;
    if (customHeightObjectUrlRef.current) {
      URL.revokeObjectURL(customHeightObjectUrlRef.current);
    }
    const href = URL.createObjectURL(fileUploaded);
    customHeightObjectUrlRef.current = href;
    setCustomHeightUploadStatus({
      status: "completed",
      filename: fileUploaded.name,
      message: "File uploaded",
      href,
      target: "_blank",
      rel: "noreferrer",
      onDelete: () => {
        if (customHeightObjectUrlRef.current) {
          URL.revokeObjectURL(customHeightObjectUrlRef.current);
          customHeightObjectUrlRef.current = undefined;
        }
        setCustomHeightUploadStatus(undefined);
      },
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={8}>
      <FileInput
        label="Upload invoice document (default height)"
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
      <Divider type="horizontal" my={0} />
      <FileInput
        label="Previously uploaded invoice document"
        inputHint="Maximum size: 500KB. Supported file types: jpg, png, pdf."
        required
        multiple={false}
        accept="image/jpeg,image/png,application/pdf"
        buttonText="Select file"
        dragAndDropText="or drag and drop your file"
        onChange={onExistingUploadChange}
        uploadStatus={existingUploadStatus}
      />
      <Divider type="horizontal" my={0} />
      <FileInput
        label="Upload invoice document (custom height)"
        inputHint="Maximum size: 500KB. Supported file types: jpg, png, pdf."
        required
        multiple={false}
        accept="image/jpeg,image/png,application/pdf"
        minHeight="150px"
        buttonText="Select file"
        dragAndDropText="Drag and drop a jpg, png, or pdf file here, or use Select file to browse your device."
        onChange={onCustomHeightChange}
        uploadStatus={customHeightUploadStatus}
      />
    </Box>
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


### Consumer Scroll Container

**Render**

```tsx
() => (
  <ScrollContainer>
    <FileInput
      label="Uploaded supporting documents"
      inputHint="Example only: these files are static, so selecting files and Delete have no effect"
      multiple
      onChange={() => {}}
      uploadStatus={scrollableStatusItems}
    />
  </ScrollContainer>
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
    onCancel: () => setUploadStatus(undefined),
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
        onCancel: () => fileReader.abort(),
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
            onDelete: () => removeFile(),
            href: fileReader.result as string,
            message: "File uploaded",
          }
        : {
            status: "uploading",
            filename: fileUploaded.name,
            onCancel: () => fileReader.abort(),
            progress,
            message: `${progress} percent uploaded`,
          };
      setUploadStatus(uploadProps);
    };

    handlers.handleError = () => {
      const uploadProps: FileUploadStatusProps = {
        status: "error",
        filename: fileUploaded.name,
        onRemove: () => removeFile(),
        message: "The file couldn't be read. Remove it and select it again.",
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

