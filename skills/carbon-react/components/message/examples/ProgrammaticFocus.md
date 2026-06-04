```tsx
export const ProgrammaticFocus: Story = () => {
  const [isOpenError, setIsOpenError] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpenError) {
      messageRef.current?.focus();
    }
  }, [isOpenError]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {!isOpenError && (
        <Button onClick={() => setIsOpenError(true)}>Open Error Message</Button>
      )}
      <Message
        open={isOpenError}
        ref={messageRef}
        onDismiss={() => setIsOpenError(false)}
        variant="error"
      >
        Some custom message
      </Message>

      {!isOpenSuccess && (
        <Button onClick={() => setIsOpenSuccess(true)}>
          Open Success Message
        </Button>
      )}
      <div aria-live="polite">
        <Message
          open={isOpenSuccess}
          onDismiss={() => setIsOpenSuccess(false)}
          variant="success"
        >
          Some custom message
        </Message>
      </div>
    </Box>
  );
};
```