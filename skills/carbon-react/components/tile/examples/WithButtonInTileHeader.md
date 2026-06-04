```tsx
export const WithButtonInTileHeader: Story = () => {
  const dummyText = [
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
    "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  ];
  const [content1, setContent1] = useState(dummyText[0]);
  const [content2, setContent2] = useState(dummyText[1]);

  const buttonAction = () => {
    setContent1(dummyText[Math.floor(Math.random() * dummyText.length)]);
    setContent2(dummyText[Math.floor(Math.random() * dummyText.length)]);
  };

  return (
    <Tile px={0} pt={0} orientation="vertical" variant="grey" width={425}>
      <TileContent>
        <TileHeader pl={3} py={1} variant="grey">
          <Button iconType="settings" onClick={buttonAction}>
            Generate content
          </Button>
        </TileHeader>
        <Box px={3} pt={3}>
          <Typography pb={2} variant="h4" fontWeight="500">
            Example tile body
          </Typography>
          <Typography>{content1}</Typography>
          <Divider type="horizontal" />
          <Typography>{content2}</Typography>
        </Box>
      </TileContent>
    </Tile>
  );
};
```