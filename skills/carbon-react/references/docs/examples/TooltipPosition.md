```tsx
export const TooltipPosition: StoryObj = () => {
  const [state, setState] = React.useState("");
  return (
    <Textarea
      label="Textarea"
      onChange={(e) => setState(e.target.value)}
      value={state}
      error="Error Message"
      tooltipPosition="bottom"
    />
  );
};
```