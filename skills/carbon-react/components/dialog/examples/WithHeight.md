```tsx
export const WithHeight: Story = {
  ...DefaultStory,
  name: "With Height",
  args: {
    ...DefaultStory.args,
    height: "500",
  },
};
```