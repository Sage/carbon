```tsx
export const SettingsRowHeadingLevels: StoryObj = () => {
  const headingVariants = ["h1", "h2", "h3", "h4", "h5"] as const;

  return (
    <>
      {headingVariants.map((variant) => (
        <Box key={variant} display="flex" mb="var(--spacing300)">
          <Box width="35%" maxWidth="230px">
            <Typography
              variant={variant}
            >{`A ${variant} level title`}</Typography>
            <Box maxWidth="var(--sizing600)">
              <Divider
                type="horizontal"
                m="var(--spacing125) var(--spacing000) var(--spacing100)"
              />
            </Box>
            <Typography color="var(--colorsUtilityYin055)">
              Content for a Description
            </Typography>
          </Box>
          <Typography
            color="var(--colorsUtilityYin055)"
            fontSize="var(--fontSizes100)"
            marginLeft="var(--sizing600)"
          >
            Content for some Settings
          </Typography>
        </Box>
      ))}
    </>
  );
};
```