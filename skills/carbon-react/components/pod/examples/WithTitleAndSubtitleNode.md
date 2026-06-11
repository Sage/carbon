```tsx
export const WithTitleAndSubtitleNode: Story = () => {
  return (
    <Pod
      title={<Typography variant="h1">Title</Typography>}
      subtitle={<Typography variant="h2">Subtitle</Typography>}
    >
      Content
    </Pod>
  );
};
```