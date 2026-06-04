```tsx
export const WithEditContentFullWidth: Story = () => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onEdit={() => {}}
      onDelete={() => {}}
      editContentFullWidth
    >
      Content
    </Pod>
  );
};
```