```tsx
export const GroupedCharacter: StoryObj = () => {
  const [state, setState] = useState("12-31-231");
  const [showError, setShowError] = useState(false);

  const groups = [2, 2, 2];

  const isValidPattern = (value: string) => {
    if (!value) return;
    const clean = value.replace(/\D/g, "");
    const expectedLength = groups.reduce((sum, g) => sum + g, 0);
    const dashPattern = new RegExp(
      `^\\d{${groups[0]}}-\\d{${groups[1]}}-\\d{${groups[2]}},`,
    );
    const noSpacePattern = clean.length === expectedLength;
    return dashPattern.test(value) || noSpacePattern;
  };

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
    if (showError) {
      setShowError(false);
    }
  };

  const handleBlur = () => {
    if (state !== "" && !isValidPattern(state)) {
      setShowError(true);
    }
  };

  return (
    <CarbonProvider validationRedesignOptIn>
      <Textbox
        label="Textbox with a Grouped Character Validation"
        inputHint="Validation pattern is XX-XX-XX"
        value={state}
        error={
          showError
            ? "Please use the correct pattern (Fix is required)"
            : undefined
        }
        onChange={setValue}
        onBlur={handleBlur}
      />
    </CarbonProvider>
  );
};
```