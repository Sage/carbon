```tsx
export const Disabled: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, text: "Multi Action Button", disabled: true },
  name: "Disabled",
};
```