```tsx
export const WithTitle: Story = {
  ...Default,
  args: {
    ...Default.args,
    title: <Typography variant="h2">Drawer Title</Typography>,
  },
};
```