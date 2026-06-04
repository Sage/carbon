```tsx
export const Default: Story = {
  render: (args) => <Link {...args}>{args.children}</Link>,
  args: {
    children: "This is an anchor link",
    href: "https://carbon.sage.com",
  },
};
```