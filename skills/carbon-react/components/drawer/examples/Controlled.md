```tsx
export const Controlled = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <Drawer
        expanded={isExpanded}
        height="225px"
        sidebar={<Box p={3}>Drawer content</Box>}
      >
        <Box p={3}>Main body content</Box>
      </Drawer>

      <Button
        mt={2}
        buttonType="primary"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Show/Hide Drawer
      </Button>
    </>
  );
};
```