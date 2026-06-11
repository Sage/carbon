```tsx
export const WithFooter: Story = {
  ...WithTitle,
  args: {
    ...WithTitle.args,
    footer: (
      <Box display="flex" justifyContent="flex-end">
        <Button buttonType="primary">Footer Action</Button>
      </Box>
    ),
  },
};
```