```tsx
export const WithContentPadding: Story = {
  ...DefaultStory,
  name: "With Content Padding",
  args: {
    ...DefaultStory.args,
    contentPadding: { p: 0 },
  },
};
```