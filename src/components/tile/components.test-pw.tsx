import React from "react";
import { Tile, TileContent, TileFooter, TileFooterProps, TileProps } from ".";
import { Dl, Dt, Dd, DlProps } from "../definition-list";
import Accordion from "../accordion/accordion.component";
import Box from "../box/box.component";
import Button from "../button/button.component";
import Typography from "../typography/typography.component";

export const TileComponent = (props: TileProps) => {
  return (
    <Box height="180px">
      <Tile {...props}>
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
    </Box>
  );
};

export const TileFooterComponent = (props: Partial<TileFooterProps>) => {
  return (
    <Tile p={0} orientation="vertical">
      <Accordion p={0} borders="none" title="Accordion">
        <Dl dtTextAlign="left" ddTextAlign="right">
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
      </Accordion>
      <TileFooter {...props} p={3}>
        {props.children || (
          <>
            <Typography pr={2} display="inline" variant="b">
              Example footer text
            </Typography>
            <Typography display="inline">Example text</Typography>
          </>
        )}
      </TileFooter>
    </Tile>
  );
};

export const DlTileComponent = (props: Partial<DlProps>) => {
  return (
    <Tile>
      <Dl data-element="dl" {...props}>
        <Dt>Coffee Subscription</Dt>
        <Dd data-element="dd">£7.00 a month</Dd>
        <Dt>Grind Size</Dt>
        <Dd>Espresso</Dd>
        <Dt>Quantity</Dt>
        <Dd>3kg</Dd>
      </Dl>
    </Tile>
  );
};

export const TileComponentWithFalsyChildren = () => {
  return (
    <Tile>
      <TileContent data-element="tile-content">Foo</TileContent>
      <TileContent data-element="tile-content">{null}</TileContent>
      {false && <TileContent data-element="tile-content">Bar</TileContent>}
    </Tile>
  );
};
