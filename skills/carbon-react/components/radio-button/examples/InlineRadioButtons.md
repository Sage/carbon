```tsx
export const InlineRadioButtons: Story = {
  ...WithLegend,
  args: {
    ...WithLegend.args,
    id: "inline",
    legendHint: "Legend Hint",
    inline: true,
  },
};
```