```tsx
export const SoftDeleteState: Story = () => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onUndo={() => {}}
      softDelete
    >
      Soft delete state
    </Pod>
  );
};
```