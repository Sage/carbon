```tsx
export const Disabled: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, disabled: true },
  name: "Disabled",
};
```