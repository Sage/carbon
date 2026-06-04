```tsx
export const WithoutVerticalBorders: Story = {
  ...DefaultStory,
  args: {
    hasOuterVerticalBorders: false,
    bottomBorderRadius: "borderRadius000",
  },
  name: "Without outer vertical borders",
};
```