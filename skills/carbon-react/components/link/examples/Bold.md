```tsx
export const Bold: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: "This is a bold link",
    bold: true,
  },
};
```