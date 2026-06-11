```tsx
export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <Breadcrumbs aria-label="Default breadcrumbs" {...args}>
        <Crumb href="#">Breadcrumb 1</Crumb>
        <Crumb href="#">Breadcrumb 2</Crumb>
        <Crumb href="#">Breadcrumb 3</Crumb>
        <Crumb href="#" isCurrent>
          Current Page
        </Crumb>
      </Breadcrumbs>
    );
  },
};
```