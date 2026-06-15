```tsx
export const LargeSize: Story = {
  ...DefaultStory,
  name: "Size: Large (1080px)",
  args: {
    ...DefaultStory.args,
    size: "large",
  },
};
```