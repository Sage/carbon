```tsx
export const WithLegendHint: Story = {
  ...WithLegend,
  args: {
    ...WithLegend.args,
    id: "with-legend-hint",
    legendHint: "Legend Hint",
  },
};
```