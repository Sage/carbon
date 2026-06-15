```tsx
export const Number: StoryObj = () => {
  const [state, setState] = useState("123456");
  const [showError, setShowError] = useState(false);

  const isValidNumber = (value: string) => {
    return value === "" || /^-?\d*\.?\d*$/.test(value);
  };

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
    if (showError) {
      setShowError(false);
    }
  };

  const handleBlur = () => {
    if (state !== "" && !isValidNumber(state)) {
      setShowError(true);
    }
  };

  return (
    <CarbonProvider validationRedesignOptIn>
      <Textbox
        label="Textbox with Number-Only Validation"
        value={state}
        error={
          showError
            ? "Please only use numeric values (Fix is required)"
            : undefined
        }
        onChange={setValue}
        onBlur={handleBlur}
      />
    </CarbonProvider>
  );
};
```