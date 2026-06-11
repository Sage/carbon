```tsx
export const WithAdditionalInformation: Story = () => {
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
      title="Title"
      subtitle="Subtitle"
      titleAdornment={<Pill>Message</Pill>}
      description="Short and descriptive description"
      additionalInformation={
        <>
          <Pill fill mr={1} mb="4px">
            Further information
          </Pill>
          <Pill fill mr={1} mb="4px">
            Further information
          </Pill>
          <Pill fill mb={1}>
            Further information
          </Pill>
        </>
      }
      checked={isChecked}
      onChange={handleChange}
    />
  );
};
```