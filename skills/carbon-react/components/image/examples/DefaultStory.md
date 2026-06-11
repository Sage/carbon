```tsx
export const DefaultStory: Story = () => {
  return (
    <Image m={3} height="700px" backgroundImage={`url("${flexibleSvg}")`}>
      <Box
        height="700px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">
          Here is an example of some overlayed text
        </Typography>
      </Box>
    </Image>
  );
};
```