```tsx
export const Mentions: Story = ({ ...args }) => {
  const mentionsData: Mention[] = [
    {
      id: "1",
      name: "Amanda Ball",
    },
    {
      id: "2",
      name: "Anaya Underwood",
      initials: "AU",
    },
    {
      id: "3",
      name: "Alastair Cox",
      initials: "AC",
    },
    {
      id: "4",
      name: "Anwar al-Awlaki",
      src: "https://loremfaces.net/24/id/2.jpg",
    },
    {
      id: "5",
      name: "Angela Alabaster",
      src: "https://loremfaces.net/24/id/1.jpg",
    },
    {
      id: "6",
      name: "Alfred Jones",
      iconType: "accessibility_web",
    },
  ];

  return (
    <Box mx={2} my={0}>
      <main>
        <TextEditor
          namespace="storybook-mentions"
          labelText="Text Editor"
          inputHint="Press '@' to mention someone"
          onChange={action("onChange")}
          customPlugins={[
            <MentionsPlugin
              namespace="storybook-mentions"
              searchOptions={mentionsData}
            />,
          ]}
          {...args}
        />
      </main>
    </Box>
  );
};
```