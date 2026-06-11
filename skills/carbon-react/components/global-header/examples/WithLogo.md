```tsx
export const WithLogo: Story = () => {
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;

  return (
    <GlobalHeader
      logo={<Logo />}
      aria-label="Global header component with logo"
    >
      Example content
    </GlobalHeader>
  );
};
```