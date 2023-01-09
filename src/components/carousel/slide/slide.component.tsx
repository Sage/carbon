/* eslint-disable react/prop-types */
import React from "react";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";
import { SlideStyle } from "./slide.style";

export interface SlideProps {
  /** Content of the Slide */
  children?: React.ReactNode;
  /** Accepts a callback function which is triggered on Slide click */
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
}

export const Slide = (props: SlideProps) => (
  <SlideStyle {...props} {...tagComponent("slide", props)} />
);

Slide.displayName = "Slide";

export default Slide;
