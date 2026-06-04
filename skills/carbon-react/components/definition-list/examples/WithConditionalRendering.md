```tsx
export const WithConditionalRendering: Story = () => (
  <Dl>
    <Dt>First</Dt>
    <Dd>Description</Dd>
    <Dt>Second</Dt>
    <Dd>Description</Dd>
    {true && (
      <>
        <Dt>Third inside of React Fragment</Dt>
        <Dd>Description inside of React Fragment</Dd>
      </>
    )}
  </Dl>
);
```