```tsx
export const Variations: Story = (args: ButtonProps) => {
  return (
    <Box display="flex" flexDirection="row" gap="24px" alignItems="flex-start">
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <h1>Default</h1>
        <h2>Primary</h2>
        <>
          <Button {...args} variant="default" variantType="primary" />
        </>
        <h2>Secondary</h2>
        <>
          <Button {...args} variant="default" variantType="secondary" />
        </>
        <h2>Tertiary</h2>
        <>
          <Button {...args} variant="default" variantType="tertiary" />
        </>
        <h2>Subtle</h2>
        <>
          <Button {...args} variant="default" variantType="subtle" />
        </>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <h1>Destructive</h1>
        <h2>Primary</h2>
        <>
          <Button {...args} variant="destructive" variantType="primary" />
        </>
        <h2>Secondary</h2>
        <>
          <Button {...args} variant="destructive" variantType="secondary" />
        </>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <h1>Gradient</h1>
        <h2>Secondary</h2>
        <>
          <Button {...args} variant="gradient" variantType="secondary" />
        </>
      </Box>
    </Box>
  );
};
```