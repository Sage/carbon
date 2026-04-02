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
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| onChange | (files: FileList) => void | Yes |  | onChange event handler. Accepts a list of all files currently entered to the input. |  |
| accept | string \| undefined | No |  | Which file format(s) to accept. Will be passed to the underlying HTML input. See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept |  |
| buttonText | string \| undefined | No |  | Text to appear on the main button. Defaults to "Select file" |  |
| dragAndDropText | string \| undefined | No |  | Explanatory text to appear inside the input area. Defaults to "or drag and drop your file" |  |
| error | string \| boolean \| undefined | No |  | Indicate that error has occurred. |  |
| id | string \| undefined | No |  | HTML id attribute of the input |  |
| inputHint | React.ReactNode | No |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| isVertical | boolean \| undefined | No |  | Sets the default layout to vertical - with the button below the explanatory text rather than next to it. This is the equivalent of removing the maxHeight prop - it will be over-ridden if this prop is set explicitly. |  |
| label | string \| undefined | No |  | Label content |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| maxHeight | string \| undefined | No |  | A valid CSS string for the max-height CSS property. |  |
| maxWidth | string \| undefined | No |  | A valid CSS string for the max-width CSS property. Defaults to the same as the minWidth. |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| minHeight | string \| undefined | No |  | A valid CSS string for the min-height CSS property. |  |
| minWidth | string \| undefined | No |  | A valid CSS string for the min-width CSS property. |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| name | string \| undefined | No |  | Name of the input |  |
| required | boolean \| undefined | No |  | Flag to configure component as mandatory. |  |
| uploadStatus | FileUploadStatusProps \| FileUploadStatusProps[] \| undefined | No |  | used to control how to display the progress of uploaded file(s) within the component |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Render the ValidationMessage above the FileInput |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Accept

**Render**

```tsx
() => {
  return (
    <FileInput
      label="Only accepts image files"
      accept="image/*"
      onChange={() => {}}
    />
  );
}
```


### Default

**Render**

```tsx
() => {
  return <FileInput label="File input" onChange={() => {}} />;
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


### Full Width

**Render**

```tsx
() => {
  return <FileInput label="File input" maxWidth="100%" onChange={() => {}} />;
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


### Required

**Render**

```tsx
() => {
  return <FileInput label="File input" required onChange={() => {}} />;
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


### Upload Status (Alternative)

**Render**

```tsx
() => {
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
}
```


### Upload Status (Client)

**Render**

```tsx
() => {
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
}
```


### Upload Status (No Progress)

**Render**

```tsx
() => {
  return (
    <FileInput
      uploadStatus={{
        status: "uploading",
        filename: "foo.pdf",
        onAction: () => {},
      }}
      onChange={() => {}}
    />
  );
}
```


### Vertical

**Render**

```tsx
() => {
  return <FileInput label="File input" isVertical onChange={() => {}} />;
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

