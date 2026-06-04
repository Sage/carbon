```tsx
export const WithDefinitionListAndCustomTextAlignment: Story = () => {
  return (
    <Tile width="40%">
      <Dl w={40} dtTextAlign="left" ddTextAlign="right">
        <Dt>Coffee Subscription</Dt>
        <Dd>£7.00 a month</Dd>
        <Dt>Grind Size</Dt>
        <Dd>Espresso</Dd>
        <Dt>Quantity</Dt>
        <Dd>3kg</Dd>
        <Dd>
          <Button
            buttonType="tertiary"
            href="https://goo.gl/maps/GMReLoBpbn9mdZVZ7"
          >
            Have a promo code?
          </Button>
        </Dd>
      </Dl>
    </Tile>
  );
};
```