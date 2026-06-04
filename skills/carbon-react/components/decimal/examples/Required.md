```tsx
export const Required: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, required: true, helpAriaLabel: "Help" },
  name: "Required",
};
```