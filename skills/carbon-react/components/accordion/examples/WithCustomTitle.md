```tsx
export const WithCustomTitle: Story = ({ ...args }) => {
  const title = (
    <Box display="flex" alignItems="center" gap="16px">
      <Image size="60px" src={collaborateSvg} decorative />
      <Box>
        <Typography variant="h2" fontSize="21px">
          Custom Title
        </Typography>
        <Typography
          as="span"
          fontSize="16px"
          color="rgba(0,0,0,0.65)"
          fontWeight="500"
        >
          Custom Subtitle
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Accordion title={title} {...args}>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
    </Accordion>
  );
};
```