import React, { useState } from "react";
import carbonLogo from "../../../logo/carbon-logo.png";

import Image from ".";
import useMediaQuery from "../../hooks/useMediaQuery";

import Box from "../box";
import Button from "../button";
import Typography from "../typography";
import flexibleSvg from "../../../.assets/flexible.svg";
import pointSvg from "../../../.assets/point.svg";
import brushSvg from "../../../.assets/brush.svg";
import collaborateSvg from "../../../.assets/collaborate.svg";
import { ImageProps } from "./image.component";

export const CarbonLogoImage = (props: ImageProps) => (
  <Image src={carbonLogo} alt="Carbon logo" {...props} />
);

export const Default = () => (
  <Image m={3} height="700px" backgroundImage={`url(${flexibleSvg})`}>
    <Box
      height="700px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4">
        Here is an example of some overlayed text
      </Typography>
    </Box>
  </Image>
);

export const AsAnImg = () => (
  <>
    <Image m={3} ml={8} alt="Example alt text" src={pointSvg} />
    <Image m={3} ml={5} size="200px" alt="Example alt text" src={brushSvg} />
    <Image m={3} size="300px" alt="Example alt text" src={collaborateSvg} />
  </>
);

export const WithHiddenProp = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Box width="20vw">
      <Button fullWidth onClick={() => setIsVisible((previous) => !previous)}>
        Toggle image visibility
      </Button>
      <Image
        width="100%"
        src={flexibleSvg}
        alt="Curvy line arrow"
        hidden={!isVisible}
      />
    </Box>
  );
};

export const CustomResponsiveBehaviour = () => {
  const query1 = useMediaQuery("(max-width: 1000px)");
  const query2 = useMediaQuery("(max-width: 900px)");
  const query3 = useMediaQuery("(max-width: 800px)");
  const responsiveProps = () => {
    if (query3) {
      return {
        backgroundSize: "contain",
        backgroundImage: `url(${pointSvg})`,
        m: 1,
      };
    }
    if (query2) {
      return {
        backgroundSize: "30%",
        backgroundRepeat: "repeat",
        backgroundImage: `url(${brushSvg})`,
      };
    }
    if (query1) {
      return {
        backgroundImage: `url(${collaborateSvg})`,
        m: 3,
      };
    }
    return {
      backgroundImage: `url(${flexibleSvg})`,
      m: 4,
    };
  };
  return (
    <Image {...responsiveProps()}>
      <Box
        height="700px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">
          Here is an example of some overlayed text
        </Typography>
      </Box>
    </Image>
  );
};

export const DecorativeImage = () => <Image alt="" src={pointSvg} decorative />;
