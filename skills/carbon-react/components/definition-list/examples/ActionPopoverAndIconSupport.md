```tsx
export const ActionPopoverAndIconSupport: Story = () => (
  <Dl>
    <Dt>
      <Box paddingTop="4px">Term example</Box>
    </Dt>
    <Dd>
      <Box display="inline-flex" alignItems="center">
        <Box mr={1}>Details example</Box>
        <Icon type="tick" />
      </Box>
    </Dd>
    <Dt>
      <Box paddingTop="4px">Term example</Box>
    </Dt>
    <Dd>
      <Box display="inline-flex" alignItems="center">
        <Icon mr={1} type="tick" />
        <Box mr={2}>Details example</Box>
        <ActionPopover rightAlignMenu>
          <ActionPopoverItem>Option 1</ActionPopoverItem>
          <ActionPopoverItem>Option 2</ActionPopoverItem>
        </ActionPopover>
      </Box>
    </Dd>
  </Dl>
);
```