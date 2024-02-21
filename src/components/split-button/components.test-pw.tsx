import React, { useState } from "react";
import Button, { ButtonProps } from "../button";
import Dialog from "../dialog";
import SplitButton, { SplitButtonProps } from "./split-button.component";
import Box from "../box";

export const SplitButtonList = (props: Partial<SplitButtonProps>) => {
  return (
    <SplitButton text="default text" {...props}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </SplitButton>
  );
};

export const SplitButtonNestedInDialog = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Dialog">
      <SplitButton text="default text">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>
    </Dialog>
  );
};

const ButtonWrapper = (props: ButtonProps) => {
  return <Button {...props} />;
};

export const WithWrapper = (props: Partial<SplitButtonProps>) => (
  <SplitButton text="Split button" {...props}>
    <ButtonWrapper>Button 1</ButtonWrapper>
    <ButtonWrapper>Button 2</ButtonWrapper>
    <ButtonWrapper>Button 3</ButtonWrapper>
  </SplitButton>
);

export const TwoSplitButtons = () => {
  return (
    <div>
      <SplitButton text="Split Button 1">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>
      <SplitButton text="Split Button 2">
        <Button>Button 4</Button>
        <Button>Button 5</Button>
        <Button>Button 6</Button>
      </SplitButton>
    </div>
  );
};

export const TwoButtonsWithWrapper = (props: Partial<SplitButtonProps>) => (
  <Box>
    <SplitButton text="Split button 1" {...props}>
      <ButtonWrapper>Button 1</ButtonWrapper>
      <ButtonWrapper>Button 2</ButtonWrapper>
      <ButtonWrapper>Button 3</ButtonWrapper>
    </SplitButton>
    <SplitButton text="Split button 2" {...props}>
      <ButtonWrapper>Button 4</ButtonWrapper>
      <ButtonWrapper>Button 5</ButtonWrapper>
      <ButtonWrapper>Button 6</ButtonWrapper>
    </SplitButton>
  </Box>
);
