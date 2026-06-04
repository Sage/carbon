```tsx
export const LeftAligned: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, required: true, align: "left" },
  name: "Left Aligned",
};
```