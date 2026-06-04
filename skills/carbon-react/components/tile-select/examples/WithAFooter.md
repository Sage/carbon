```tsx
export const WithAFooter: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };
  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title Short and descriptive description"
      subtitle="Subtitle Short and descriptive description"
      checked={isChecked}
      onChange={handleChange}
      description="Short and descriptive description"
      footer={
        <Box pt={1} display="flex" alignItems="baseline">
          Here is some &nbsp;
          <Typography variant="strong">footer text</Typography>
          <Button
            ml={1}
            buttonType="tertiary"
            iconPosition="after"
            iconType="home"
          >
            Footer Button
          </Button>
        </Box>
      }
    />
  );
};
```