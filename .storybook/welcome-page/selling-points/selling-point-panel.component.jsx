import React from "react";

import { Panel, Image, Heading, Text } from "./selling-points.style";

import flexible from "../../../.assets/flexible.svg";
import hammer from "../../../.assets/hammer.svg";
import plug from "../../../.assets/plug.svg";
import point from "../../../.assets/point.svg";
import brush from "../../../.assets/brush.svg";
import collaborate from "../../../.assets/collaborate.svg";

const images = {
  flexible,
  hammer,
  plug,
  point,
  brush,
  collaborate,
};

const imagesAltText = {
  flexible:
    "Carbon is beautiful out-of-the-box, down to colours, icons, and style.",
  hammer: "Hundreds of thousands of users worldwide help Carbon evolve.",
  plug: "Carbon powers your app. Contribute your code, so you can power Carbon too.",
  point:
    "Over 50 components and 340 configurations bring your killer app to life.",
  brush:
    "Meet your users' needs with a simple, elegant, delightful experience.",
  collaborate:
    "With Carbon's UI Kit, designers and developers speak the same language.",
};

export default ({ icon, heading, text }) => (
  <Panel>
    <Image src={images[icon]} alt={imagesAltText[icon]} />
    <Heading>{heading}</Heading>
    <Text>{text}</Text>
  </Panel>
);
