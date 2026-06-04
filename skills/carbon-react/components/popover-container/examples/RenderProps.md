```tsx
export const RenderProps: Story = () => {
  return (
    <Box height={250}>
      <PopoverContainer
        title="Custom Open &amp; Close Button"
        renderOpenComponent={({
          isOpen,
          "data-element": dataElement,
          onClick,
          ref,
          "aria-label": ariaLabel,
          id,
          "aria-expanded": ariaExpanded,
          "aria-haspopup": ariaHasPopup,
        }) => (
          <Button
            iconType={!isOpen ? "filter_new" : "close"}
            iconPosition="after"
            data-element={dataElement}
            aria-label={ariaLabel}
            aria-haspopup={ariaHasPopup}
            aria-expanded={ariaExpanded}
            ref={ref}
            id={id}
            onClick={onClick}
          >
            Filter
          </Button>
        )}
        renderCloseComponent={({
          "data-element": dataElement,
          onClick,
          ref,
          "aria-label": ariaLabel,
        }) => (
          <Button
            data-element={dataElement}
            aria-label={ariaLabel}
            ref={ref}
            onClick={onClick}
          >
            Close
          </Button>
        )}
      >
        Content
      </PopoverContainer>
    </Box>
  );
};
```