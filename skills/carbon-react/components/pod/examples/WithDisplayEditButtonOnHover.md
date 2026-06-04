```tsx
export const WithDisplayEditButtonOnHover: Story = () => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onEdit={() => {}}
      displayEditButtonOnHover
    >
      Content
    </Pod>
  );
};
```