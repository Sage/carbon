```tsx
export const ReadOnly: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, readOnly: true },
  name: "Read Only",
};
```