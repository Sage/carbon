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
| isVertical | boolean \| undefined | No |  |  |  | Controls the drop-zone layout. Defaults to `true`, which stacks its contents vertically; set to `false` for a horizontal layout. | true |
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
| multiple | boolean \| undefined | No |  |  |  | Controls whether multiple files can be selected. Defaults to `false`, which hides the drop zone while a status card is present; set to `true` to keep the drop zone available alongside status cards. | false |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| name | string \| undefined | No |  |  |  |  |  |
| required | boolean \| undefined | No |  |  |  | Marks the field as required with a visual indicator and an accessible description on the Select file button. The hidden native input is not marked `required`, so browser validation never blocks form submission; validate on submit and supply `error` instead. |  |
| uploadStatus | FileUploadStatusProps \| FileUploadStatusProps[] \| undefined | No |  |  |  | Status card data for files that are uploading, completed, previously uploaded, or in error. Each item renders a card showing the filename, its state, and its actions. In single-file mode, a status card replaces the drop zone; in multiple-file mode, status cards are displayed alongside it. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Yes | No replacement: validation is shown above the drop zone by default, so omit this prop. `false`, which renders validation below the drop zone, is retained for existing consumers and will be removed in a future major release. |  | true |

## Examples
### Default

**Args**

```tsx
{
    label: "File input",
    multiple: false,
  }
```

**Render**

```tsx
(args) => {
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
        {...args}
        onChange={onChange}
        uploadStatus={args.uploadStatus ?? uploadStatus}
        error={args.error ?? error}
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


### MDX Example 1

**Args**

```tsx
## Examples

### Default

<Canvas of={FileInputStories.Default} />

### With inputHint

<Canvas of={FileInputStories.WithInputHint} />

### Required

You can use the `required` prop to indicate if the field is mandatory.

<Canvas of={FileInputStories.Required} />

### Required field validation

FileInput never derives or clears `error` itself - it's a controlled prop. This example starts in the "required and no file uploaded" error
state, as if a form had just been submitted empty, then clears the error once a file is added, the same way a real form's `onChange` would.

<Canvas of={FileInputStories.RequiredFieldValidation} />

### Size variations

By default the component fills the available width of its parent container and has a minimum height of `102px`. It can therefore follow a narrow sidebar,
a form column, or a wider content area without component-specific width props.

You can constrain it with `minWidth` and `maxWidth`, or adjust its height with `minHeight` and `maxHeight`, to accommodate long explanatory text or a
particular design. These props accept valid CSS values, so consumers are responsible for choosing compatible minimum and maximum values and
ensuring that the button, text, status message, thumbnail, and actions still fit. Restrictive dimensions may cause content to wrap, overflow, or be clipped.

Width constraints apply to both the drop zone and status cards. In single-file mode, custom height constraints also apply to the one status card that
replaces the drop zone. In multiple-file mode, status cards retain their content-driven height.

#### Increased height

<Canvas of={FileInputStories.IncreasedHeight} />

#### Both height and width increased

<Canvas of={FileInputStories.IncreasedBoth} />

#### Parent container widths

This example shows the fluid default inside a `400px`-wide container and inside a `Sidebar` at its default width. Select "Show file input in a sidebar" to open the sidebar:

<Canvas of={FileInputStories.ParentContainerWidths} />

#### Width constraints

Set `minWidth` and `maxWidth` when the component needs constraints independent of its parent. The two props are optional and behave independently.

<Canvas of={FileInputStories.WidthConstraints} />

### Accept and file type validation

The `accept` prop is passed directly to the underlying HTML `<input type="file">` element, and helps guide users towards uploading files of the correct format or type.
Please see the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) for more details on this attribute. When selecting a file via the
Select file button, the operating system's file picker will either highlight the appropriate files, or make it impossible to select incorrect ones.

Note that `accept` does not prevent the user from uploading a file of the incorrect type via drag and drop, so you should still use the `onChange` prop to add an error
message as soon as an inappropriate file is added - as shown below. And of course nothing takes away the need for validation on the server side.

<Canvas of={FileInputStories.FileTypeValidation} />

### Single file vs multiple files

By default FileInput is in single-file mode (`multiple` defaults to `false`): the operating system's file picker restricts selection to one file, and once
`uploadStatus` contains a status, the drop zone is replaced by its status card. A removable current file must be removed before another can be
selected. A `previously` status also keeps the drop zone hidden, so give it `onDelete` when users should be able to replace it. The default instruction explicitly offers both options:
drag and drop, or use the Select file button. If you supply `buttonText`, the default instruction uses that label; supply `dragAndDropText` to
replace the instruction entirely.

Set `multiple={true}` (or just `multiple`) when users should be able to add files while status cards are displayed.

Dragging and dropping bypasses the file picker's restriction, so more than one file can still reach `onChange` even with the single-file default.
FileInput never discards files or derives `error` on your behalf (the same rule that applies to a required field with no files), so your `onChange`
should check `files.length` and set `error` yourself when it's greater than one - the example below does exactly that, showing the same Field-error
treatment either for a missing required file or for too many files being dropped at once.

FileInput is controlled: update `uploadStatus` in `onChange` to show a selected file and provide its remove action. The Default story demonstrates this
single-file flow and reports an error if multiple files are dropped together. Focus remains on the Select file button while a controlled status is pending,
then moves to the status card's first action or Preview link when it appears, or to the named status list when the card has neither.
Cancel, Delete, Remove, and Retry (status actions) are announced by their action and filename only (for example, "Delete report.pdf, button").
In multiple-file mode, focus remains on the Select file button so users can continue adding files. The polite selection announcement also becomes the
button's accessible description, ensuring the selection result is available when assistive technology announces the returning focus.
The description clears when focus leaves the button, and later announcements, such as upload completion, are made through the live region only.
After Delete, Remove, or Cancel removes a status card, the localized result is added temporarily to the accessible description of the next action,
list, or Select file button before focus moves there. This ensures the focus announcement includes the result; the temporary description clears when focus leaves.
It also clears when Preview is activated, so returning from a preview does not repeat a stale removal result. If there is nowhere to move focus,
the result is announced through the polite live region instead.
No removal announcement is made when the consumer callback leaves the card rendered.

Without moving focus, a persistent polite live region announces the selected filenames and any files that newly change to `status: "completed"`.
A status that changes to `status: "error"` is announced by that file's own polite status region (see [Upload error summary](#upload-error-summary)).
Other changes, such as progress updates or a retry returning a file to `status: "uploading"`, are not announced automatically; they are
available as the visible status message when users navigate to the file. Statuses supplied when the field first renders are not announced.

<Canvas of={FileInputStories.SingleFile} />

### Tracking upload status

The `uploadStatus` prop is used to indicate when a file has been added, as well as to display the current status or progress of its upload —
including options to cancel or remove the uploaded file. You must provide this prop (as a `FileUploadStatusProps` object) in order for users
to see any visual indication of the uploaded file.

Consumers own the status array and append, update, or remove entries as the upload lifecycle changes. In the default single-file mode, the drop zone
remains hidden while any status is present; with `multiple`, the drop zone stays available alongside all statuses.
Custom minimum and maximum widths apply to both the drop zone and status cards. In single-file mode, custom minimum and maximum heights also apply to its
one status card. In multiple-file mode, status cards retain their content-driven height.

For this reason the `onChange` function prop is mandatory - without providing an implementation for this event handler that updates the
components `uploadStatus`, there will be no visual change once a file has been added to the input.

#### Status actions

Each status shows the actions whose callbacks you supply. File Input only renders the buttons and announces the result; your callbacks do the
work and update `uploadStatus`.

| `status`     | Actions                                 | Callbacks                      |
| ------------ | --------------------------------------- | ------------------------------ |
| `uploading`  | Cancel                                  | `onCancel`                     |
| `completed`  | Delete, Preview                         | `onDelete`, `href`             |
| `error`      | Remove, Retry                           | `onRemove`, optional `onRetry` |
| `previously` | Delete (single-file mode only), Preview | optional `onDelete`, `href`    |

The actions differ by whether the file is stored:

- **Cancel** stops an upload in progress.
- **Delete** is for a stored file (completed or previously uploaded); your `onDelete` should remove it from storage.
- **Remove** is for a failed file that was never stored; your `onRemove` only dismisses it.
- **Retry** repeats the failed upload. Supply `onRetry` only when trying again could succeed, such as after a network or server failure.
  Omit it for files your validation rejected before upload (for example, an unsupported type or a file that is too large), since the same
  file fails again.

Previously uploaded files are read-only in multiple-file mode. If deleting a previously uploaded file fails, change it to `status: "error"`
with an `onRemove` that either clears the status, so the user can select another file, or restores the `previously` status, so the user
can try Delete again.

Remove the file's status inside the Cancel, Delete, or Remove callback, without waiting for a server response. File Input then moves focus
to the next file's action and announces the result. If the status is removed later, focus is lost. Give each status an `id` when
filenames can repeat.

#### Multiple files example

This is the `multiple={true}` opt-in mode (single-file is the default), showing several files uploading side by side with every status-specific callback wired up and working:
`onCancel` while a file is uploading, `onRetry` and `onRemove` for a file that failed, and `onDelete` for one that completed. Add a few files (or drop
several at once) to try it. It also starts with a read-only previously uploaded file, representing an existing historical record.

<Canvas of={FileInputStories.MultipleFiles} />

#### Consumer scroll container

File Input does not add an internal scrollbar. When a long status list needs a
height constraint, place File Input in a consumer-owned scroll container. That
container owns the scrollbar and scrolls the complete File Input, including its
label and drop zone.

This example uses a static list of 10 uploaded files to demonstrate scrolling, so
selecting files and the Delete actions have no effect.

<Canvas of={FileInputStories.ConsumerScrollContainer} />

#### Upload error summary

After an upload fails, update that current item in `uploadStatus` to
`status: "error"`. When there is more than one current file, File Input shows
a summary below the current-files label. The summary updates as failed items
are retried, removed, or changed to another status; previously uploaded files
are not included.

Each file has a persistent polite status region. When a file fails, its filename
and error message populate that region. Remove and Retry remain outside it, so
they are available through normal keyboard and screen-reader navigation without
becoming part of the automatic announcement.

<Canvas of={FileInputStories.UploadErrorSummary} />

#### Client side example

Here is a relatively simple example of using a [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) to track progress purely
on the client side, resulting in storing the file locally as a `data:` URL. This is a way to show users a preview of their file if you do not intend
to track upload progress on the server, or do not actually send the files to a server until form submission.

Note the use of a `ref` to store the `FileReader` object - this is not essential but avoids having to create a new `FileReader` object more than once in the
lifecycle of the component.

This example also contains validation to restrict the user from uploading large files - this is useful because storing a large file in memory may make the
browser freeze or even crash. If your application needs to process large files on the client side then consider
[reading the file into an ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer) and processing that piece-by-piece.

This example starts with a static "Loaded 56%" card, so an in-progress state is visible right away rather than only once you add a file
yourself (for a small file, the browser may fire so few progress events that it jumps straight to "completed"). Cancel clears it, or add a
real file to see the FileReader-driven version take over.

<Canvas of={FileInputStories.UploadStatusTracked} />

#### Uploading with a progress percentage

With `progress` set, the status icon exposes a `progressbar` role with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` set to the
percentage, and is named with the filename. Assistive technology can report the value when users navigate to it, but progress changes are
not announced automatically.

`progress` does not change the visual indicator: the ring loader plays a tracked animation that does not reflect the percentage, and the
value is not turned into visible text. Pair it with a `message` (for example `"Loaded 56%"`) so the percentage is shown as text too, as
in the client side example above.

#### Uploading without a progress percentage

Without `progress`, the ring loader plays an untracked animation to indicate an indeterminate upload. The visible status message (either
your own `message`, or the localized default, `fileInput.uploading`) already conveys the upload state, so the loader is hidden from
assistive technology and screen readers read the filename and status message as text. If the status message is empty, the loader is
exposed as an image named with the filename and the localized `fileInput.uploading` text instead, so the upload state is never lost.

The example below omits `message`, so the default locale text ("Uploading…") is shown and read after the filename. Cancel is wired to
clear the status, so the drop zone returns afterwards.

<Canvas of={FileInputStories.UploadStatusUntracked} />

#### Showing a thumbnail

Supplying `thumbnailSrc` on a status object (any status - uploading, completed, error, or previously uploaded) adds a leading thumbnail
column ahead of the filename, in place of the compact inline status icon shown otherwise. The image itself is shown for completed and
previously uploaded files; while uploading the column shows the loader, and in error it shows the error icon. If the image fails to load,
the file icon is shown instead. The thumbnail is decorative and has empty alternative text, so the filename remains the file's name for
assistive technology.

`SingleFile` and `MultipleFiles` above demonstrate this too once you upload a real image, but this example shows the with-thumbnail
layout without needing to upload anything.

<Canvas of={FileInputStories.WithThumbnail} />

## Validation States

This component supports input validation, see our [Validations](../?path=/docs/documentation-validations--docs) documentation page for more information.

By default, the input error message appears below the label set, after the hint text when provided, and before the drop zone. `validationMessagePositionTop={false}` is deprecated, but continues to render validation below the drop zone for existing consumers. Individual file upload errors remain with their file status.

## Props

### File Input

<ArgTypes of={FileInputStories} />

Props for `uploadStatus` are discriminated by `status`. Use `onCancel` for uploading, `onDelete` for completed files, and `onRemove` plus optional `onRetry` for failures. In single-file mode, a previously uploaded file shows Delete when given `onDelete`; previously uploaded files are read-only in multiple-file mode, where `onDelete` is ignored. The deprecated `onAction` remains a primary-action fallback. Completed and previous files accept optional `href`; filenames remain text. Every status accepts an optional decorative `thumbnailSrc`.

#### Migrating upload item props (`uploadStatus` entries)

`onAction` still works as a deprecated fallback, but new code should use the callback that matches each status:

| `status` value | Preferred callback(s) | Legacy fallback |
| -------------- | --------------------- | --------------- |
| `uploading` | `onCancel` | `onAction` |
| `completed` | `onDelete` (+ optional `href` for Preview) | `onAction` |
| `error` | `onRemove` (+ optional `onRetry`) | `onAction` |
| `previously` | optional `onDelete` (+ optional `href` for Preview) | `onAction` |

Status-by-status examples:
```

