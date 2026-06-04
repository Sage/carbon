```tsx
export const InFullScreenDialogStory: Story = () => {
  const Content = ({ title, noTextbox }: ContentProps) => (
    <Box>
      <h2>{title}</h2>
      {!noTextbox && <Textbox label={title} value="" onChange={() => {}} />}
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
    </Box>
  );

  const [isOpen, setIsOpen] = useState(false);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open AnchorNavigation</Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Title"
        subtitle="Subtitle"
      >
        <AnchorNavigation
          stickyNavigation={
            <>
              <AnchorNavigationItem target={ref1}>First</AnchorNavigationItem>
              <AnchorNavigationItem target={ref2}>Second</AnchorNavigationItem>
              <AnchorNavigationItem target={ref3}>Third</AnchorNavigationItem>
              <AnchorNavigationItem target={ref4}>
                Navigation item with very long label
              </AnchorNavigationItem>
              <AnchorNavigationItem target={ref5}>Fifth</AnchorNavigationItem>
            </>
          }
        >
          <Box ref={ref1}>
            <Content title="First section" />
          </Box>
          <AnchorSectionDivider />
          <Box ref={ref2}>
            <Content title="Second section" />
          </Box>
          <AnchorSectionDivider />
          <Box ref={ref3}>
            <Content noTextbox title="Third section" />
          </Box>
          <AnchorSectionDivider />
          <Box ref={ref4}>
            <Content title="Fourth section" />
          </Box>
          <AnchorSectionDivider />
          <Box ref={ref5}>
            <Content title="Fifth section" />
          </Box>
        </AnchorNavigation>
      </Dialog>
    </>
  );
};
```