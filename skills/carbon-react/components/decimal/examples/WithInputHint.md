```tsx
export const WithInputHint: Story = {
  ...DefaultStory,
  args: {
    ...DefaultStory.args,
    inputHint: "Hint text (optional).",
    helpAriaLabel: "Help",
  },
  name: "With Input Hint",
};
```