```tsx
export const Sizes: Story = () => {
  const [smallState, setSmallState] = useState("Password");
  const setSmallValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSmallState(target.value);
  };
  const [mediumState, setMediumState] = useState("Password");
  const setMediumValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setMediumState(target.value);
  };
  const [largeState, setLargeState] = useState("Password");
  const setLargeValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setLargeState(target.value);
  };

  return (
    <>
      <Password
        key="Password - Small"
        label="Password - Small"
        value={smallState}
        size="small"
        onChange={setSmallValue}
        mb={2}
      />
      <Password
        key="Password - Medium"
        label="Password - Medium"
        value={mediumState}
        size="medium"
        onChange={setMediumValue}
        mb={2}
      />
      <Password
        key="Password - Large"
        label="Password - Large"
        value={largeState}
        size="large"
        onChange={setLargeValue}
        mb={2}
      />
    </>
  );
};
```