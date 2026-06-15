```tsx
export const WithActionButtonAdornment: Story = () => {
  const [value, setValue] = useState<string | null>(null);
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
            Inactive
          </Pill>
        }
        description="Short and descriptive description"
        customActionButton={() => (
          <Button
            onClick={() => setValue("1")}
            buttonType="tertiary"
            type="button"
            px={1}
            size="small"
            disabled
          >
            Reactivate
          </Button>
        )}
        actionButtonAdornment={
          <Icon
            type="info"
            tooltipMessage="This tile cannot be reactivated at this time"
          />
        }
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
        customActionButton={(onClick) => (
          <Button
            onClick={onClick}
            buttonType="tertiary"
            type="button"
            px={1}
            size="small"
            destructive
            disabled
          >
            Remove
          </Button>
        )}
        actionButtonAdornment={
          <Icon
            type="info"
            tooltipMessage="This tile cannot be removed at this time"
          />
        }
      />
    </TileSelectGroup>
  );
};
```