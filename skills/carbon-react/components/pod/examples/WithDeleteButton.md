```tsx
export const WithDeleteButton: Story = () => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onEdit={() => {}}
      onDelete={() => {}}
      onUndo={() => {}}
    >
      Content
    </Pod>
  );
};
```