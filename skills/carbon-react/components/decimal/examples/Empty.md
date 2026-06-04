```tsx
export const Empty: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, allowEmptyValue: true },
  name: "Empty",
};
```