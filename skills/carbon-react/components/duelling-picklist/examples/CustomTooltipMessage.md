```tsx
export const CustomTooltipMessage: Story = () => (
  <ul>
    <PicklistItem
      type="add"
      item={1}
      onChange={() => null}
      locked
      tooltipMessage="This is a custom locked tooltip message"
    >
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "50%" }}>
          <p style={{ fontWeight: 500, margin: 0, marginLeft: 24 }}>
            Title for Item
          </p>
        </div>
      </div>
    </PicklistItem>
  </ul>
);
```