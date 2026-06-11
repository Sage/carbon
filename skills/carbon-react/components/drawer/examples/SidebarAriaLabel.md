```tsx
export const SidebarAriaLabel: Story = {
  ...Default,
  args: {
    ...Default.args,
    sidebarAriaLabel: "This is a Drawer",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
```