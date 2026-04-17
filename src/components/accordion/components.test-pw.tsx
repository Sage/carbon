import React from "react";
import SplitButton from "../split-button";
import Button from "../button/button.component";

import { Accordion, AccordionProps } from ".";

export const AccordionComponent = (props: Partial<AccordionProps>) => {
  return (
    <Accordion title="Title" {...props}>
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
    </Accordion>
  );
};

export const AccordionWithSplitButton = () => {
  return (
    <Accordion expanded title="Accordion">
      <SplitButton text="Split Button">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>
    </Accordion>
  );
};
