import React, { useState } from "react";
import Button from "../button";
import Dialog from "../dialog";
import SplitButton, { SplitButtonProps } from "./split-button.component";

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
