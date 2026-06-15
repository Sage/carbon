```tsx
export const LabelFontWeight: Story = {
  ...Default,
  args: {
    ...Default.args,
    labelWeight: "bold",
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};
```