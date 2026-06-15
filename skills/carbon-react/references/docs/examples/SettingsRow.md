```tsx
export const SettingsRow: StoryObj = () => (
  <Box display="flex">
    <Box width="35%" maxWidth="230px">
      <Typography variant="h3">A Title</Typography>
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
      Content for sone Settings
    </Typography>
  </Box>
);
```