```tsx
export const ConditionalRendering = () => {
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

  return (
    <div aria-live="polite">
      <Button m={2} buttonType="primary" onClick={handleButtonClick}>
        Render Loader
      </Button>

      {isLoading ? <Loader /> : "Content to Load"}
    </div>
  );
};
```