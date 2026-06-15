```tsx
export const ResponsiveWidth: Story = () => {
  return (
    <FileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      maxWidth="min(800px, 100%)"
      minWidth="250px"
      onChange={() => {}}
    />
  );
};
```