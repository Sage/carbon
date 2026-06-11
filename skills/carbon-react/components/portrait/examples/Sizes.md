```tsx
export const Sizes: Story = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center">
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait key={size} size={size} />
        ))}
      </Box>
      <Box display="flex" alignItems="center">
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait shape="square" key={size} size={size} />
        ))}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait key={size} size={size} initials="MK" />
        ))}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait shape="square" key={size} size={size} initials="MK" />
        ))}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait
            key={size}
            size={size}
            src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
          />
        ))}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait
            shape="square"
            key={size}
            size={size}
            src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
          />
        ))}
      </Box>
    </Box>
  );
};
```