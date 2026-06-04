```tsx
export const LinkPreviewCloseIcon: Story = () => {
  return (
    <LinkPreview
      title="This is an example of a title"
      url="https://www.sage.com"
      description="Captain, why are we out here chasing comets?"
      as="div"
      onClose={(url) => action("close icon clicked")(url)}
    />
  );
};
```