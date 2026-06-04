```tsx
export const InsideButton: Story = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mimicLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };
  const handleButtonClick = () => {
    mimicLoading();
  };
  const buttonContent = isLoading ? <Loader isInsideButton /> : "Click me";

  return (
    <div aria-live="polite">
      <Button m={2} buttonType="primary" onClick={handleButtonClick}>
        {buttonContent}
      </Button>
    </div>
  );
};
```