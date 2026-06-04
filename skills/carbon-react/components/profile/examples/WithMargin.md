```tsx
export const WithMargin: Story = () => (
  <Box display="flex" alignItems="baseline">
    <Profile
      m={2}
      size="XS"
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
    />
    <Profile
      m={3}
      size="S"
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
    />
    <Profile
      m="50px"
      size="XL"
      email="email@email.com"
      initials="JD"
      name="John Doe"
      text="+33 657 22 34 71"
    />
  </Box>
);
```