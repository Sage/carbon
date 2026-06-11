```tsx
export const WithFooterNode: Story = (args: FormProps) => {
  const footerNode = (
    <Box>
      <Typography>
        This is the footer text that will be added to provide information about
        the form content.
      </Typography>
      <Link icon="placeholder" href="#">
        This is a link
      </Link>
    </Box>
  );

  return (
    <Form {...args} footerChildren={footerNode}>
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
    </Form>
  );
};
```