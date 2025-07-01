import React, { useState } from "react";
import Dialog from "../dialog";
import MultiActionButton, {
  MultiActionButtonProps,
} from "./multi-action-button.component";
import Button, { ButtonProps } from "../button";
import Box from "../box";
import { Accordion } from "../accordion";

export const MultiActionButtonList = (
  props: Partial<MultiActionButtonProps>,
) => {
  return (
    <Box>
      <MultiActionButton text="Multi Action Button" {...props}>
        <Button>Example Button</Button>
        <Button>Example Button with long text</Button>
        <Button>Short</Button>
      </MultiActionButton>
    </Box>
  );
};

export const MultiActionNestedInDialog = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Dialog">
      <MultiActionButton text="default text">
        <Button>Example Button</Button>
        <Button>Example Button with long text</Button>
        <Button>Short</Button>
      </MultiActionButton>
    </Dialog>
  );
};

export const MultiActionWithHrefChildren = () => (
  <MultiActionButton text="default text">
    <Button href="#">Button 1</Button>
    <Button>Button 2</Button>
    <Button href="#">Button 3</Button>
  </MultiActionButton>
);

export const MultiActionButtonWithOneChild = () => (
  <MultiActionButton text="default text">
    <Button>Button 1</Button>
  </MultiActionButton>
);

const ButtonWrapper = (props: ButtonProps) => {
  return <Button {...props} />;
};

export const WithWrapper = (props: Partial<MultiActionButtonProps>) => (
  <MultiActionButton text="Multi Action Button" {...props}>
    <ButtonWrapper>Button 1</ButtonWrapper>
    <ButtonWrapper>Button 2</ButtonWrapper>
    <ButtonWrapper>Button 3</ButtonWrapper>
  </MultiActionButton>
);
export const WithWrapperTwoButtons = (
  props: Partial<MultiActionButtonProps>,
) => (
  <Box>
    <MultiActionButton text="Multi Action Button 1" {...props}>
      <ButtonWrapper>Button 1</ButtonWrapper>
      <ButtonWrapper>Button 2</ButtonWrapper>
      <ButtonWrapper>Button 3</ButtonWrapper>
    </MultiActionButton>
    <MultiActionButton text="Multi Action Button 2" {...props}>
      <ButtonWrapper>Button 1</ButtonWrapper>
      <ButtonWrapper>Button 2</ButtonWrapper>
      <ButtonWrapper>Button 3</ButtonWrapper>
    </MultiActionButton>
  </Box>
);

export const MultiActionTwoButtons = (
  props: Partial<MultiActionButtonProps>,
) => {
  return (
    <Box>
      <MultiActionButton text="Multi Action Button 1" {...props}>
        <Button>Example Button</Button>
        <Button>Example Button with long text</Button>
        <Button>Short</Button>
      </MultiActionButton>
      <MultiActionButton text="Multi Action Button 2" {...props}>
        <Button>Example Button</Button>
        <Button>Example Button with long text</Button>
        <Button>Short</Button>
      </MultiActionButton>
    </Box>
  );
};

export const InOverflowHiddenContainer = () => {
  return (
    <Accordion title="Heading">
      <Box p={4}>
        <MultiActionButton
          size="large"
          subtext="subtext"
          text="Multi Action Button"
        >
          <Button size="large" href="#">
            Button 1
          </Button>
          <Button size="large">Button 2</Button>
          <Button size="large">Button 3</Button>
        </MultiActionButton>
      </Box>
    </Accordion>
  );
};

export const ChildButtonTypes = () => {
  return (
    <MultiActionButton text="Multi Action Button">
      <Button>Default button</Button>
      <Button buttonType="primary">Primary</Button>
      <Button buttonType="primary" destructive>
        Primary - destructive
      </Button>
      <Button buttonType="secondary">Secondary</Button>
      <Button buttonType="secondary" destructive>
        Secondary - destructive
      </Button>
      <Button buttonType="tertiary">Tertiary</Button>
      <Button buttonType="tertiary" destructive>
        Tertiary - destructive
      </Button>
      <Button disabled>Disabled</Button>
    </MultiActionButton>
  );
};
