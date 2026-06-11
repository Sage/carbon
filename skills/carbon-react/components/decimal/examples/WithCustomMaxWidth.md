```tsx
export const WithCustomMaxWidth: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, maxWidth: "50%" },
  name: "With Custom Max Width",
};
```