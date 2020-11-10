/* eslint-disable react/prop-types */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select } from "@storybook/addon-knobs";
import { ThemeProvider } from "styled-components";
import { dlsThemeSelector } from "../../../.storybook/theme-selectors";
import notes from "./documentation";
import BaseCarousel, { Carousel, Slide } from "./carousel.component";
import getDocGenInfo from "../../utils/helpers/docgen-info";
import docgenInfo from "./docgenInfo.json";

const styleElement = {
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
};

const ExampleCustomElement = (props) => {
  return (
    <div style={{ ...styleElement, ...props.style }}>{props.children}</div>
  );
};

BaseCarousel.__docgenInfo = getDocGenInfo(docgenInfo, /carousel(?!spec)/);
storiesOf("Carousel", module)
  .addParameters({
    info: {
      propTablesExclude: [Slide, ExampleCustomElement, ThemeProvider],
      propTables: [BaseCarousel],
    },
  })

  .add(
    "default",
    () => {
      const indexConfig = [0, 1, 2, 3, 4];
      const initialSlideIndex = select(
        "initialSlideIndex",
        indexConfig,
        BaseCarousel.defaultProps.initialSlideIndex
      );
      const slideIndex = select("slideIndex", indexConfig, indexConfig[2]);

      const handleClick = () => {
        action("click")();
      };

      return (
        <Carousel initialSlideIndex={initialSlideIndex} slideIndex={slideIndex}>
          <Slide style={{ textAlign: "center" }}>
            <ExampleCustomElement style={{ backgroundColor: "#003349" }}>
              <h1 style={{ textAlign: "center", color: "#090" }}>Slide 1</h1>
            </ExampleCustomElement>
          </Slide>
          <Slide onClick={handleClick}>
            <ExampleCustomElement>
              <h1 style={{ textAlign: "center" }}>Full clickable slide</h1>
            </ExampleCustomElement>
          </Slide>
          <Slide>
            <ExampleCustomElement style={{ backgroundColor: "#69418f" }}>
              <h1 style={{ color: "#fff" }}>Slide 3</h1>
            </ExampleCustomElement>
          </Slide>
          <Slide>
            <ExampleCustomElement style={{ backgroundColor: "red" }}>
              <h1 style={{ color: "#fff" }}>Slide 4</h1>
            </ExampleCustomElement>
          </Slide>
          <Slide>
            <ExampleCustomElement style={{ backgroundColor: "blue" }}>
              <h1 style={{ color: "#fff" }}>Slide 5</h1>
            </ExampleCustomElement>
          </Slide>
        </Carousel>
      );
    },
    {
      themeSelector: dlsThemeSelector,
      notes: { markdown: notes },
      // disabled because of chromatic lack of possibility to render story
      // Your story couldn’t be captured because it exceeds our 25,000,000px limit.
      // Its dimensions are 1,200x25,498px. Possible ways to resolve
      chromatic: {
        disable: true,
      },
    }
  );
