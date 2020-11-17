/* eslint-disable react/prop-types */
import React from "react";
import tagComponent from "../../../utils/helpers/tags/tags";
import { SlideStyle } from "./slide.style";
import baseTheme from "../../../style/themes/base";

const Slide = (props) => {
  return <SlideStyle {...props} {...tagComponent("slide", props)} />;
};

Slide.defaultProps = {
  theme: baseTheme,
};

export default Slide;
