```tsx
export const WithHeaderAndFooterPadding: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        aria-label="sidebar"
        position="left"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header={<Typography variant="h3">Sidebar Header</Typography>}
        p={2}
        headerPadding={{ p: 2 }}
      >
        <Form
          rightSideButtons={<Button>Action button</Button>}
          stickyFooter
          buttonAlignment="right"
          footerPadding={{ p: 2 }}
        >
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lectus
            massa, suscipit vitae pellentesque quis, facilisis non ante.
            Curabitur fringilla sapien non ante elementum venenatis. Curabitur
            viverra, massa ac congue imperdiet, purus ligula dictum quam, id
            tincidunt diam risus quis eros. Vivamus semper sem ac tempor
            malesuada. Proin nec sollicitudin mi. Nunc egestas ipsum ac lorem
            pretium blandit. Quisque ac ultricies lacus. Phasellus vel enim id
            est ornare finibus eget vitae ipsum. Maecenas non accumsan dolor.
            Morbi sed mauris mollis lorem finibus feugiat. Maecenas scelerisque
            nec orci ac finibus. Nulla dictum, quam vel gravida lobortis, nisl
            eros vulputate augue, eget malesuada lacus elit sed leo. In a ex id
            metus vulputate sollicitudin at eget neque. Aliquam cursus quis odio
            in consequat.
          </Typography>
        </Form>
      </Sidebar>
    </>
  );
};
```