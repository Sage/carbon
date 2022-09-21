/* eslint-disable react/prop-types */
import React from "react";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";
import { SlideStyle } from "./slide.style";

export interface SlideProps {
  children?: React.ReactNode;
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
}

const Slide = (props: SlideProps) => (
  <SlideStyle {...props} {...tagComponent("slide", props)} />
);

export default Slide;
