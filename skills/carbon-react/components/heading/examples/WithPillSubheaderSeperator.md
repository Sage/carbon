```tsx
export const WithPillSubheaderSeperator: Story = () => {
  return (
    <Heading
      title="This is a Title"
      subheader="This is a subheader"
      pills={<Pill>Pill</Pill>}
      separator
    />
  );
};
```