```tsx
export const MediumSize: Story = {
  ...DefaultStory,
  name: "Size: Medium (850px) - Default",
  args: {
    ...DefaultStory.args,
    size: "medium",
  },
};
```