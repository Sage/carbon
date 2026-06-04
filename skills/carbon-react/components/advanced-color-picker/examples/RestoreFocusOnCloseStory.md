```tsx
export const RestoreFocusOnCloseStory: Story = () => {
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  const [color, setColor] = useState("orchid");
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setColor(target.value);
  };
  return (
    <>
      <AdvancedColorPicker
        restoreFocusOnClose={false}
        name="advancedPicker"
        availableColors={[
          { value: "#FFFFFF", label: "white" },
          { value: "transparent", label: "transparent" },
          { value: "#000000", label: "black" },
          { value: "#A3CAF0", label: "blue" },
          { value: "#FD9BA3", label: "pink" },
          { value: "#B4AEEA", label: "purple" },
          { value: "#ECE6AF", label: "goldenrod" },
          { value: "#EBAEDE", label: "orchid" },
          { value: "#EBC7AE", label: "desert" },
          { value: "#AEECEB", label: "turquoise" },
          { value: "#AEECD6", label: "mint" },
        ]}
        selectedColor={color}
        onChange={onChange}
        onOpen={() => {
          setOpen(!open);
          setShowMessage(false);
        }}
        onClose={() => {
          setOpen(false);
          setShowMessage(true);
          setTimeout(() => messageRef.current?.focus(), 1);
        }}
        onBlur={() => {}}
        open={open}
        mb={showMessage ? 5 : 0}
      />
      {showMessage && (
        <Message
          ref={messageRef}
          variant="error"
          onDismiss={() => setShowMessage(false)}
        >
          Some custom message
        </Message>
      )}
    </>
  );
};
```