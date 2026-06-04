```tsx
export const LabelInline: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, labelInline: true },
  parameters: { chromatic: { disableSnapshot: true } },
  name: "Label Inline",
};
```