```tsx
export const HeaderAndFooter: Story = () => {
  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-header-and-footer"
        labelText="Text Editor"
        header={<Button buttonType="gradient-white">Button</Button>}
        footer={
          <Typography color="--colorsUtilityYin055">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text{" "}
            <Link href="https://carbon.sage.com/?path=/story/welcome--welcome-page">
              ever since the 1500s
            </Link>
          </Typography>
        }
      />
    </Box>
  );
};
```