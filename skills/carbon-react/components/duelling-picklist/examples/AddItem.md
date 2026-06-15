```tsx
export const AddItem: Story = () => (
  <ul>
    <PicklistItem type="add" item={1} onChange={() => null}>
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