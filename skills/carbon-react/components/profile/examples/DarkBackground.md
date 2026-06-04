```tsx
export const DarkBackground: Story = () => {
  return (
    <Box
      p={2}
      backgroundColor="black"
      width="190px"
      height="50px"
      borderRadius="borderRadius200"
    >
      <Profile
        darkBackground
        email="email@email.com"
        initials="JD"
        name="John Doe"
        text="+33 657 22 34 71"
      />
    </Box>
  );
};
```