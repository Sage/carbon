```tsx
export const WithScrollableContent: Story = {
  render: function WithScrollableContentExample(args) {
    const { children, open, ...rest } = args;
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog open={isOpen} onCancel={() => setIsOpen(false)} {...rest}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <div tabIndex={0}>
            <Box margin={2}>{children}</Box>
          </div>
        </Dialog>
      </>
    );
  },
  args: {
    children: childrenText.repeat(2),
    title: "Dialog with scrollable content",
    subtitle: "amet non ornare suspendisse tempor.",
    height: "200px",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => (
      <Box height="900px" width="100%">
        <Story />
      </Box>
    ),
  ],
};
```