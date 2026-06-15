```tsx
export const WithNoUnderline: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: "This is an anchor link with no underline",
    underline: "never",
  },
};
```