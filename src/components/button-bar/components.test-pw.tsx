import React from "react";
import Button from "../button";
import ButtonBar, { ButtonBarProps } from ".";
import IconButton from "../icon-button";
import Icon from "../icon";
import ButtonMinor from "../button-minor";

const DefaultWithWrapper = (args: Partial<ButtonBarProps>) => {
  const WrappedComponent = () => {
    return (
      <>
        <Button iconType="bin">bar</Button>
        <Button iconType="csv">bar</Button>
        <Button iconType="pdf">bar</Button>
      </>
    );
  };

  return (
    <ButtonBar {...args}>
      <WrappedComponent />
      <IconButton onClick={() => undefined}>
        <Icon type="csv" />
      </IconButton>
    </ButtonBar>
  );
};

const ButtonBarWithMinorButtonChildren = () => (
  <ButtonBar>
    <ButtonMinor iconType="search">Example ButtonMinor</ButtonMinor>
    <ButtonMinor iconType="pdf">Example ButtonMinor</ButtonMinor>
    <ButtonMinor iconType="csv">Example ButtonMinor</ButtonMinor>
  </ButtonBar>
);

const Default = (args: Partial<ButtonBarProps>) => (
  <ButtonBar {...args}>
    <Button iconType="search">Example Button</Button>
    <Button iconType="pdf">Example Button</Button>
    <Button iconType="csv">Example Button</Button>
  </ButtonBar>
);

const DefaultWithButtonMinor = (args: Partial<ButtonBarProps>) => (
  <ButtonBar {...args}>
    <ButtonMinor iconType="search">Example Button</ButtonMinor>
    <ButtonMinor iconType="pdf">Example Button</ButtonMinor>
    <ButtonMinor iconType="csv">Example Button</ButtonMinor>
  </ButtonBar>
);

const ButtonBarWithDisabledIconButton = () => {
  return (
    <ButtonBar>
      <IconButton disabled onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
    </ButtonBar>
  );
};

export {
  Default,
  DefaultWithWrapper,
  ButtonBarWithMinorButtonChildren,
  DefaultWithButtonMinor,
  ButtonBarWithDisabledIconButton,
};
