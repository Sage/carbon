```tsx
export const Subtext: Story = {
  ...DefaultStory,
  args: {
    ...DefaultStory.args,
    size: "large",
    text: "Multi Action Button",
    subtext: "subtext",
    children: (
      <>
        <Button size="large" href="#">
          Button 1
        </Button>
        <Button size="large">Button 2</Button>
        <Button size="large">Button 3</Button>
      </>
    ),
  },
  name: "Subtext",
};
```