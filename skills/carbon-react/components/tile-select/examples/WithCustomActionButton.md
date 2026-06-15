```tsx
export const WithCustomActionButton: Story = () => {
  const [value, setValue] = useState<string | null>(null);
  const [activated, setActivated] = useState(false);
  const [removed, setRemoved] = useState(false);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.value)}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Pill pillRole="status" colorVariant="neutral">
            {activated ? "Active" : "Inactive"}
          </Pill>
        }
        description="Short and descriptive description"
        customActionButton={
          activated
            ? undefined
            : () => (
                <Button
                  onClick={() => {
                    setValue("1");
                    setActivated(true);
                  }}
                  buttonType="tertiary"
                  type="button"
                  size="small"
                >
                  Reactivate
                </Button>
              )
        }
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          removed ? undefined : (
            <Pill pillRole="status" colorVariant="neutral">
              Active
            </Pill>
          )
        }
        description="Short and descriptive description"
        customActionButton={(onClick) => (
          <Button
            onClick={() => {
              setRemoved(true);
              onClick();
            }}
            buttonType="tertiary"
            type="button"
            size="small"
            destructive
            disabled={removed}
          >
            Remove
          </Button>
        )}
      />
    </TileSelectGroup>
  );
};
```