```tsx
export const Prefix: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, prefix: "£", maxWidth: "20%" },
  name: "Prefix",
};
```