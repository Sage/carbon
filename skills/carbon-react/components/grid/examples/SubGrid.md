```tsx
export const SubGrid: Story = () => {
  return (
    <Box id="grid-align">
      <GridContainer>
        <GridItem justifySelf="left" gridColumn="1 / 1">
          <Pod alignTitle="left" variant="primary" border size="medium">
            1
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="center" gridColumn="2 / 11">
          <Dl>
            <Dt>Drink</Dt>
            <Dd>Coffee</Dd>
            <Dt>Brew Method</Dt>
            <Dd>Stove Top Moka Pot</Dd>
            <Dt>Brand of Coffee</Dt>
            <Dd>Magic Coffee Beans</Dd>
            <Dt>Website</Dt>
            <Dd>
              <Link href="www.sage.com">Magic Coffee Beans' Website</Link>
            </Dd>
            <Dt>Email</Dt>
            <Dd>
              <Link href="magic@coffeebeans.com">magic@coffeebeans.com</Link>
            </Dd>
            <Dt>Main and Registered Address</Dt>
            <Dd mb="4px">Magic Coffee Beans,</Dd>
            <Dd mb="4px">In The Middle of Our Street,</Dd>
            <Dd mb="4px">Madness,</Dd>
            <Dd mb="4px">CO4 3VE</Dd>
            <Dd>
              <Button
                buttonType="tertiary"
                iconType="link"
                iconPosition="after"
                href="https://goo.gl/maps/GMReLoBpbn9mdZVZ7"
              >
                View in Google Maps
              </Button>
            </Dd>
          </Dl>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="right" gridColumn="11 / 12">
          <Pod alignTitle="left" variant="primary" border size="medium">
            3
          </Pod>
        </GridItem>
      </GridContainer>
    </Box>
  );
};
```