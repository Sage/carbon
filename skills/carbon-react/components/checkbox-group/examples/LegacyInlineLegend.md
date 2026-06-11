```tsx
export const LegacyInlineLegend: Story = {
  ...Default,
  args: {
    ...Default.args,
    legendInline: true,
    legendWidth: 20,
    legendAlign: "left",
    legendSpacing: 2,
  },
};
```