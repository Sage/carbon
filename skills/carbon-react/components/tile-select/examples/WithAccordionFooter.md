```tsx
export const WithAccordionFooter: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [expanded, setExpanded] = useState(true);
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
      title="Title"
      subtitle="Subtitle"
      description="Short and descriptive description"
      checked={isChecked}
      onChange={handleChange}
      prefixAdornment={
        <Image
          height="40px"
          width="40px"
          backgroundImage={`url("${flexibleSvg}")`}
        />
      }
      accordionContent={
        <Box display="flex" flexWrap="wrap">
          <Box flexGrow={1} pr={1}>
            <Box
              width="100%"
              height="100px"
              bg="primary"
              display="inline-block"
            />
          </Box>
          <Box flexGrow={1} pl={1}>
            <Box
              width="100%"
              height="100px"
              bg="primary"
              display="inline-block"
            />
          </Box>
        </Box>
      }
      accordionControl={(controlId, contentId) => (
        <Button
          buttonType="tertiary"
          iconPosition="before"
          iconType="chevron_down"
          data-element="accordion-button"
          onClick={() => setExpanded((expandedState) => !expandedState)}
          px={1}
          mt={2}
          aria-controls={contentId}
          aria-expanded={expanded}
          id={controlId}
        >
          {expanded ? "Close" : "Open"} accordion
        </Button>
      )}
      accordionExpanded={expanded}
    />
  );
};
```