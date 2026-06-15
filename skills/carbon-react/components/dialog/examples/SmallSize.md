```tsx
export const SmallSize: Story = {
  ...DefaultStory,
  name: "Size: Small (540px)",
  args: {
    ...DefaultStory.args,
    size: "small",
  },
};
```