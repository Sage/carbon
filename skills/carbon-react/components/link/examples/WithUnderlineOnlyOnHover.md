```tsx
export const WithUnderlineOnlyOnHover: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: "This is an anchor link with an underline applied on hover",
    underline: "hover",
  },
};
```