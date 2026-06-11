```tsx
export const WithAPrefixAdornment: Story = () => {
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
      checked={isChecked}
      prefixAdornment={
        <Image
          height="40px"
          width="40px"
          backgroundImage={`url("${flexibleSvg}")`}
        />
      }
      titleAdornment={<Pill>Message</Pill>}
      onChange={handleChange}
      description="Short and descriptive description"
    />
  );
};
```