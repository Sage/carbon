import React from "react";
import ButtonMinor, { ButtonMinorProps } from "./button-minor.component";

const Default = (props: ButtonMinorProps) => <ButtonMinor {...props} />;

const ButtonMinorCustom = (props: ButtonMinorProps) => (
  <ButtonMinor {...props}>Example Button</ButtonMinor>
);
const ButtonMinorDifferentTypes = (props: ButtonMinorProps) => {
  return (
    <div>
      <ButtonMinor buttonType="primary" {...props}>
        Primary
      </ButtonMinor>
      <ButtonMinor buttonType="secondary" {...props}>
        Secondary
      </ButtonMinor>
      <ButtonMinor buttonType="tertiary" {...props}>
        Tertiary
      </ButtonMinor>
    </div>
  );
};

export { Default, ButtonMinorCustom, ButtonMinorDifferentTypes };
