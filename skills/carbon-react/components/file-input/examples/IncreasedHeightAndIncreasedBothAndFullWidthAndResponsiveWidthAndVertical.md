```tsx
export const IncreasedHeight: Story = () => {
  return (
    <FileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      minHeight="200px"
      onChange={() => {}}
    />
  );
};

export const IncreasedBoth: Story = () => {
  return (
    <FileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      maxWidth="500px"
      minHeight="200px"
      onChange={() => {}}
    />
  );
};

export const FullWidth: Story = () => {
  return <FileInput label="File input" maxWidth="100%" onChange={() => {}} />;
};

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

export const Vertical: Story = () => {
  return <FileInput label="File input" isVertical onChange={() => {}} />;
};
```