```tsx
export const WithInternalEditButton: Story = () => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      internalEditButton
      onEdit={() => {}}
      onDelete={() => {}}
    >
      Content
    </Pod>
  );
};
```