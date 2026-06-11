```tsx
export const FocusButtonProgrammatically = () => {
  const ref = useRef<ActionPopoverHandle>(null);
  const refMore = useRef<ActionPopoverHandle>(null);

  const renderButton = (props: RenderButtonProps) => (
    <ActionPopoverMenuButton
      buttonType="tertiary"
      iconType="ellipsis_vertical"
      iconPosition="after"
      size="small"
      aria-label={undefined}
      {...props}
    >
      More
    </ActionPopoverMenuButton>
  );

  return (
    <>
      <Button
        onClick={() => {
          ref.current?.focusButton();
        }}
      >
        Focus
      </Button>
      <ActionPopover ref={ref}>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>

      <Button
        onClick={() => {
          refMore.current?.focusButton();
        }}
      >
        Focus More
      </Button>
      <ActionPopover renderButton={renderButton} ref={refMore} mt={3}>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </>
  );
};
```