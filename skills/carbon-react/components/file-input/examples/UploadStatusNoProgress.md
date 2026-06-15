```tsx
export const UploadStatusNoProgress: Story = () => {
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
};
```