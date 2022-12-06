import React from "react";
import Box from "./box.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { getDataElementByValue } from "../../../cypress/locators";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";

const colorConstants = [
  ["red", "rgb(255, 0, 0)", "#FF0000"],
  ["yellow", "rgb(255, 255, 0)", "#FFFF00"],
  ["blue", "rgb(0, 0, 255)", "#0000FF"],
];

const bgConstants = [
  ["primary", "rgb(0, 125, 90)", "#007D5A"],
  ["secondary", "rgb(0, 96, 70)", "#006046"],
  ["tertiary", "rgb(0, 64, 46)", "#00402E"],
];

const widthConstants = [
  ["135px", 0.1, 135],
  ["683px", 0.5, 683],
  ["1366px", 1, 1366],
];

const heightConstants = [
  ["135px", 135],
  ["683px", 683],
  ["1366px", 1366],
];

const sizeConstants = [
  ["135px", 0.1, 135],
  ["683px", 0.5, 683],
  ["1366px", 1, 1366],
];

const BoxComponent = ({ ...props }) => {
  return (
    <Box
      m={3}
      p={3}
      width={400}
      height={400}
      data-element="box"
      bg="primary"
      color="red"
      {...props}
    >
      This is some sample text
    </Box>
  );
};

const BoxComponentMulti = ({ ...props }) => {
  return (
    <div>
      <Box display="flex" data-element="box" bg="blue" {...props}>
        <Box
          width="100px"
          height="100px"
          bg="primary"
          color="yellow"
          data-element="boxone"
          {...props}
        >
          {" "}
          Supercalifrajilisticexpialidocious Word{" "}
        </Box>
        <Box
          width="100px"
          height="100px"
          bg="primary"
          color="yellow"
          data-element="boxtwo"
          {...props}
        >
          {" "}
          Box Two Box Two Box Two Box Two Box Two{" "}
        </Box>
        <Box
          width="100px"
          height="100px"
          bg="primary"
          color="yellow"
          data-element="boxthree"
          {...props}
        >
          {" "}
          Box Three Box Three Box Three Box Three{" "}
        </Box>
      </Box>
    </div>
  );
};

const verifyScrollbarVariant = (variant, thumbColor, trackColor) =>
  getDataElementByValue("boxone").then(($els) => {
    // get Window reference from element
    const win = $els[0].ownerDocument.defaultView;
    // use getComputedStyle to read the pseudo selector
    const thumb = win.getComputedStyle($els[0], "-webkit-scrollbar-thumb");
    const track = win.getComputedStyle($els[0], "-webkit-scrollbar-track");
    // read the value of the `content` CSS property
    const colorValueThumb = thumb.getPropertyValue("background-color");
    const colorValueTrack = track.getPropertyValue("background-color");
    expect(colorValueThumb).to.eq(thumbColor);
    expect(colorValueTrack).to.eq(trackColor);
  });

context("Testing Box component", () => {
  describe("should render Box component", () => {
    it.each(colorConstants)(
      "should verify Box text is %s when color prop is passed as string",
      (color, rgbValue) => {
        CypressMountWithProviders(<BoxComponent color={color} />);

        getDataElementByValue("box")
          .should("have.attr", "color", color)
          .and("have.css", "color", rgbValue);
      }
    );

    it.each(colorConstants)(
      "should verify Box text is %s when color prop passed as RGB value",
      (color, rgbValue) => {
        CypressMountWithProviders(<BoxComponent color={rgbValue} />);

        getDataElementByValue("box")
          .should("have.attr", "color", rgbValue)
          .and("have.css", "color", rgbValue);
      }
    );

    it.each(colorConstants)(
      "should verify Box text is %s when color prop passed as hex",
      (color, rgbValue, hexValue) => {
        CypressMountWithProviders(<BoxComponent color={hexValue} />);

        getDataElementByValue("box")
          .should("have.attr", "color", hexValue)
          .and("have.css", "color", rgbValue);
      }
    );

    it.each(bgConstants)(
      "should verify Box bg prop passed as string",
      (color, rgbValue) => {
        CypressMountWithProviders(<BoxComponent bg={color} />);

        getDataElementByValue("box").should(
          "have.css",
          "background-color",
          rgbValue
        );
      }
    );

    it.each(bgConstants)(
      "should verify Box bg prop passed as RGB value",
      (color, rgbValue) => {
        CypressMountWithProviders(<BoxComponent bg={rgbValue} />);

        getDataElementByValue("box").should(
          "have.css",
          "background-color",
          rgbValue
        );
      }
    );

    it.each(bgConstants)(
      "should verify Box bg prop passed as hex value",
      (color, rgbValue, hexValue) => {
        CypressMountWithProviders(<BoxComponent bg={hexValue} />);

        getDataElementByValue("box").should(
          "have.css",
          "background-color",
          rgbValue
        );
      }
    );

    it.each(bgConstants)(
      "should verify Box backgroundColor prop passed as string",
      (color, rgbValue) => {
        CypressMountWithProviders(
          <BoxComponent bg="" backgroundColor={color} />
        );

        getDataElementByValue("box").should(
          "have.css",
          "background-color",
          rgbValue
        );
      }
    );

    it.each(bgConstants)(
      "should verify Box backgroundColor prop passed as RGB value",
      (color, rgbValue) => {
        CypressMountWithProviders(
          <BoxComponent bg="" backgroundColor={rgbValue} />
        );

        getDataElementByValue("box").should(
          "have.css",
          "background-color",
          rgbValue
        );
      }
    );

    it.each(bgConstants)(
      "should verify Box backgroundColor prop passed as hex value",
      (color, rgbValue, hexValue) => {
        CypressMountWithProviders(
          <BoxComponent bg="" backgroundColor={hexValue} />
        );

        getDataElementByValue("box").should(
          "have.css",
          "background-color",
          rgbValue
        );
      }
    );

    it.each(["0.1", "0.5", "1"])(
      "should verify Box opacity is %s",
      (opacity) => {
        CypressMountWithProviders(
          <BoxComponent bg="primary" opacity={opacity} />
        );

        getDataElementByValue("box").should("have.css", "opacity", opacity);
      }
    );

    it.each(widthConstants)(
      "should verify Box width is %s when prop is passed as a percentage",
      (width, percentage) => {
        CypressMountWithProviders(
          <BoxComponent bg="primary" width={percentage} />
        );

        getDataElementByValue("box")
          .should("have.attr", "width", percentage)
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", parseInt(width));
          });
      }
    );

    it.each(widthConstants)(
      "should verify Box width is %s when prop is passed as a number",
      (width, percentage, number) => {
        CypressMountWithProviders(<BoxComponent bg="primary" width={number} />);

        getDataElementByValue("box")
          .should("have.attr", "width", number)
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", parseInt(width));
          });
      }
    );

    it.each(widthConstants)(
      "should verify Box width is %s when prop is passed as a string",
      (width) => {
        CypressMountWithProviders(<BoxComponent bg="primary" width={width} />);

        getDataElementByValue("box")
          .should("have.attr", "width", width)
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", parseInt(width));
          });
      }
    );

    it.each(heightConstants)(
      "should verify Box height is %s when prop is passed as a number",
      (height, number) => {
        CypressMountWithProviders(
          <BoxComponent bg="primary" height={number} />
        );

        getDataElementByValue("box")
          .should("have.attr", "height", number)
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "height", parseInt(height));
          });
      }
    );

    it.each(heightConstants)(
      "should verify Box height is %s when prop is passed as a string",
      (height) => {
        CypressMountWithProviders(
          <BoxComponent bg="primary" height={height} />
        );

        getDataElementByValue("box")
          .should("have.attr", "height", height)
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "height", parseInt(height));
          });
      }
    );

    it.each(sizeConstants)(
      "should verify Box height and width are %s when size prop is passed as a number",
      (pixels, percentage, number) => {
        CypressMountWithProviders(<BoxComponent size={number} />);

        getDataElementByValue("box").then(($el) => {
          useJQueryCssValueAndAssert($el, "width", parseInt(pixels));
          useJQueryCssValueAndAssert($el, "height", parseInt(pixels));
        });
      }
    );

    it.each(sizeConstants)(
      "should verify Box height and width are %s when size prop is passed as a string",
      (pixels) => {
        CypressMountWithProviders(<BoxComponent size={pixels} />);

        getDataElementByValue("box").then(($el) => {
          useJQueryCssValueAndAssert($el, "width", parseInt(pixels));
          useJQueryCssValueAndAssert($el, "height", parseInt(pixels));
        });
      }
    );

    it.each(["block", "inline-block", "flex", "contents", "list-item", "none"])(
      "should verify Box display is %s",
      (display) => {
        CypressMountWithProviders(<BoxComponent display={display} />);

        getDataElementByValue("box")
          .should("have.attr", "display", display)
          .and("have.css", "display", display);
      }
    );

    it.each([
      "baseline",
      "bottom",
      "middle",
      "sub",
      "super",
      "text-bottom",
      "text-top",
      "top",
    ])("should verify Box alignItmes is %s", (alignment) => {
      CypressMountWithProviders(
        <BoxComponentMulti verticalAlign={alignment} />
      );

      getDataElementByValue("box").should(
        "have.css",
        "vertical-align",
        alignment
      );
    });

    it.each(["auto", "clip", "hidden", "scroll", "visible"])(
      "should verify Box overflow is %s",
      (overflow) => {
        CypressMountWithProviders(<BoxComponent overflow={overflow} />);

        getDataElementByValue("box")
          .should("have.attr", "overflow", overflow)
          .and("have.css", "overflow", overflow);
      }
    );

    it.each(["auto", "clip", "hidden", "scroll", "visible"])(
      "should verify Box overflowX is %s",
      (overflow) => {
        CypressMountWithProviders(<BoxComponent overflowX={overflow} />);

        getDataElementByValue("box").should("have.css", "overflow-x", overflow);
      }
    );

    it.each(["auto", "clip", "hidden", "scroll", "visible"])(
      "should verify Box overflowY is %s",
      (overflow) => {
        CypressMountWithProviders(<BoxComponent overflowY={overflow} />);

        getDataElementByValue("box").should("have.css", "overflow-y", overflow);
      }
    );

    it.each([
      [200, 300],
      [400, 400],
    ])(
      "should verify when Width is set to %s that Box width is not less than minWidth %s",
      (width, minWidth) => {
        CypressMountWithProviders(
          <BoxComponent minWidth={300} width={width} />
        );

        getDataElementByValue("box").then(($el) => {
          useJQueryCssValueAndAssert($el, "width", minWidth);
        });
      }
    );

    it.each([
      ["200px", 300],
      ["400px", 400],
    ])(
      "should verify when Width is set to %s that Box width is not less than minWidth %s",
      (width, minWidth) => {
        CypressMountWithProviders(
          <BoxComponent minWidth={300} width={width} />
        );

        getDataElementByValue("box").then(($el) => {
          useJQueryCssValueAndAssert($el, "width", minWidth);
        });
      }
    );

    it.each([
      [0.1, 300],
      [0.3, 409],
    ])(
      "should verify when Width is set to %s that Box width is not less than minWidth %s",
      (width, minWidth) => {
        CypressMountWithProviders(
          <BoxComponent minWidth={300} width={width} />
        );

        getDataElementByValue("box").then(($el) => {
          useJQueryCssValueAndAssert($el, "width", minWidth);
        });
      }
    );

    it.each([
      [400, 400],
      [800, 600],
    ])(
      "should verify when Width is set to %s that Box width is not more than maxWidth %s",
      (width, maxWidth) => {
        CypressMountWithProviders(
          <BoxComponent maxWidth={600} width={width} />
        );

        getDataElementByValue("box").then(($el) => {
          useJQueryCssValueAndAssert($el, "width", maxWidth);
        });
      }
    );

    it.each([
      ["400px", 400],
      ["800px", 600],
    ])(
      "should verify when Width is set to %s that Box width is not more than maxWidth %s",
      (width, maxWidth) => {
        CypressMountWithProviders(
          <BoxComponent maxWidth={600} width={width} />
        );

        getDataElementByValue("box").then(($el) => {
          useJQueryCssValueAndAssert($el, "width", maxWidth);
        });
      }
    );

    it.each([
      [0.1, 135],
      [0.5, 600],
    ])(
      "should verify when Width is set to %s that Box width is not more than maxWidth %s",
      (width, maxWidth) => {
        CypressMountWithProviders(
          <BoxComponent maxWidth={600} width={width} />
        );

        getDataElementByValue("box").then(($el) => {
          useJQueryCssValueAndAssert($el, "width", maxWidth);
        });
      }
    );

    it.each([
      [400, 600],
      [800, 800],
    ])(
      "should verify when Height is set to %s that Box height is not less than minHeight %s",
      (height, minHeight) => {
        CypressMountWithProviders(
          <BoxComponent minHeight={600} height={height} />
        );

        getDataElementByValue("box").then(($el) => {
          useJQueryCssValueAndAssert($el, "height", minHeight);
        });
      }
    );

    it.each([
      ["400px", 600],
      ["800px", 800],
    ])(
      "should verify when Height is set to %s that Box height is not less than minHeight %s",
      (height, minHeight) => {
        CypressMountWithProviders(
          <BoxComponent minHeight={600} height={height} />
        );

        getDataElementByValue("box").then(($el) => {
          useJQueryCssValueAndAssert($el, "height", minHeight);
        });
      }
    );

    it.each([
      [400, 400],
      [800, 600],
    ])(
      "should verify when Height is set to %s that Box height is not more than maxHeight %s",
      (height, maxHeight) => {
        CypressMountWithProviders(
          <BoxComponent maxHeight={600} height={height} />
        );

        getDataElementByValue("box").then(($el) => {
          useJQueryCssValueAndAssert($el, "height", maxHeight);
        });
      }
    );

    it.each([
      ["400px", 400],
      ["800px", 600],
    ])(
      "should verify when Height is set to %s that Box height is not more than maxHeight %s",
      (height, maxHeight) => {
        CypressMountWithProviders(
          <BoxComponent maxHeight={600} height={height} />
        );

        getDataElementByValue("box").then(($el) => {
          useJQueryCssValueAndAssert($el, "height", maxHeight);
        });
      }
    );

    it.each([
      "normal",
      "stretch",
      "baseline",
      "center",
      "flex-start",
      "flex-end",
    ])("should verify Box alignItmes is %s", (alignment) => {
      CypressMountWithProviders(<BoxComponentMulti alignItems={alignment} />);

      getDataElementByValue("box").should("have.css", "align-items", alignment);
    });

    it.each([
      "normal",
      "baseline",
      "center",
      "flex-start",
      "flex-end",
      "space-between",
      "space-around",
      "stretch",
    ])("should verify Box alignContent is %s", (alignment) => {
      CypressMountWithProviders(<BoxComponentMulti alignContent={alignment} />);

      getDataElementByValue("box").should(
        "have.css",
        "align-content",
        alignment
      );
    });

    it.each([
      "left",
      "center",
      "right",
      "flex-start",
      "flex-end",
      "normal",
      "stretch",
    ])("should verify Box justifyItems is %s", (justified) => {
      CypressMountWithProviders(<BoxComponentMulti justifyItems={justified} />);

      getDataElementByValue("box").should(
        "have.css",
        "justify-items",
        justified
      );
    });

    it.each([
      "left",
      "center",
      "right",
      "flex-start",
      "flex-end",
      "normal",
      "space-between",
      "space-around",
      "stretch",
    ])("should verify Box justifyContent is %s", (justified) => {
      CypressMountWithProviders(
        <BoxComponentMulti justifyContent={justified} />
      );

      getDataElementByValue("box").should(
        "have.css",
        "justify-content",
        justified
      );
    });

    it.each(["nowrap", "wrap", "wrap-reverse"])(
      "should verify Box flex wrap is %s",
      (wrap) => {
        CypressMountWithProviders(<BoxComponentMulti flexWrap={wrap} />);

        getDataElementByValue("box").should("have.css", "flex-wrap", wrap);
      }
    );

    it.each(["column", "column-reverse", "row", "row-reverse"])(
      "should verify Box flex direction is %s",
      (direction) => {
        CypressMountWithProviders(
          <BoxComponentMulti flexDirection={direction} />
        );

        getDataElementByValue("boxone").should(
          "have.css",
          "flex-direction",
          direction
        );
      }
    );

    it.each(["auto", "content", "fit-content", "max-content", "min-content"])(
      "should verify Box flex is %s",
      (flex) => {
        CypressMountWithProviders(<BoxComponentMulti flex={flex} />);

        getDataElementByValue("box").should("have.css", "flex-basis", flex);
      }
    );

    it.each([
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ])("should verify Box flex grow is %s", (value, growText) => {
      CypressMountWithProviders(
        <BoxComponentMulti flex="auto" flexGrow={value} />
      );

      getDataElementByValue("box").should("have.css", "flex-grow", growText);
    });

    it.each([
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ])("should verify Box flex shrink is %s", (value, shrinkText) => {
      CypressMountWithProviders(
        <BoxComponentMulti flex="auto" flexShrink={value} />
      );

      getDataElementByValue("box").should(
        "have.css",
        "flex-shrink",
        shrinkText
      );
    });

    it.each(["auto", "content", "fit-content", "max-content", "min-content"])(
      "should verify Box flex basis is %s",
      (basis) => {
        CypressMountWithProviders(<BoxComponentMulti flexBasis={basis} />);

        getDataElementByValue("box").should("have.css", "flex-basis", basis);
      }
    );

    it.each([
      "auto",
      "baseline",
      "left",
      "normal",
      "right",
      "stretch",
      "center",
      "flex-start",
      "flex-end",
    ])("should verify Box justifySelf is %s", (justify) => {
      CypressMountWithProviders(<BoxComponentMulti justifySelf={justify} />);

      getDataElementByValue("box").should("have.css", "justify-self", justify);
    });

    it.each([
      "auto",
      "baseline",
      "normal",
      "stretch",
      "center",
      "flex-start",
      "flex-end",
    ])("should verify Box alignSelf is %s", (align) => {
      CypressMountWithProviders(<BoxComponentMulti alignSelf={align} />);

      getDataElementByValue("box").should("have.css", "align-self", align);
    });

    it.each([
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ])("should verify Box order is %s", (value, orderText) => {
      CypressMountWithProviders(<BoxComponentMulti order={value} />);

      getDataElementByValue("box").should("have.css", "order", orderText);
    });

    it.each(["break-word", "anywhere"])(
      "should verify Box overflow wrap is %s",
      (wrap) => {
        CypressMountWithProviders(<BoxComponentMulti overflowWrap={wrap} />);

        getDataElementByValue("box").should("have.css", "overflow-wrap", wrap);
      }
    );

    it.each([
      ["light", "rgb(102, 132, 148)", "rgb(242, 245, 246)"],
      ["dark", "rgb(153, 173, 183)", "rgb(51, 91, 112)"],
    ])("should verify Box scrollbar variant is %s", (variant, thumb, track) => {
      CypressMountWithProviders(
        <BoxComponentMulti
          display="inline-block"
          size="150px"
          overflow="auto"
          scrollVariant={variant}
          mr="20px"
        />
      );

      verifyScrollbarVariant(variant, thumb, track);
    });

    it.each(["fixed", "absolute", "static", "sticky", "relative"])(
      "should verify Box position is %s",
      (value) => {
        CypressMountWithProviders(
          <BoxComponent
            top="0px"
            left="0px"
            right="0px"
            bottom="0px"
            position={value}
          />
        );

        getDataElementByValue("box").should("have.css", "top", "0px");
        getDataElementByValue("box").should("have.css", "bottom", "0px");
        getDataElementByValue("box").should("have.css", "right", "0px");
        getDataElementByValue("box").should("have.css", "left", "0px");
        getDataElementByValue("box").should("have.css", "position", value);
      }
    );

    it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, "20%", "20px"])(
      "should verify gap prop sets expected CSS on Box",
      (gap) => {
        CypressMountWithProviders(<BoxComponent display="flex" gap={gap} />);

        getDataElementByValue("box").should(
          "have.css",
          "row-gap",
          typeof gap === "number" ? `${gap * 8}px` : gap
        );

        getDataElementByValue("box").should(
          "have.css",
          "column-gap",
          typeof gap === "number" ? `${gap * 8}px` : gap
        );
      }
    );

    it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, "20%", "20px"])(
      "should verify rowGap prop sets expected CSS on Box and overrides gap if set",
      (rowGap) => {
        CypressMountWithProviders(
          <BoxComponent display="flex" rowGap={rowGap} gap={8} />
        );

        getDataElementByValue("box").should(
          "have.css",
          "row-gap",
          typeof rowGap === "number" ? `${rowGap * 8}px` : rowGap
        );

        getDataElementByValue("box").should("have.css", "column-gap", "64px");
      }
    );

    it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, "20%", "20px"])(
      "should verify columnGap prop sets expected CSS on Box and overrides gap if set",
      (columnGap) => {
        CypressMountWithProviders(
          <BoxComponent display="flex" columnGap={columnGap} gap={8} />
        );

        getDataElementByValue("box").should("have.css", "row-gap", "64px");

        getDataElementByValue("box").should(
          "have.css",
          "column-gap",
          typeof columnGap === "number" ? `${columnGap * 8}px` : columnGap
        );
      }
    );
  });
});
