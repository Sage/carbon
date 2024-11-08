import React from "react";

import { Panel, Image, Heading, Text } from "./selling-points.style";

const images = {
  flexible: require("../../../.assets/flexible.svg"),
  hammer: require("../../../.assets/hammer.svg"),
  plug: require("../../../.assets/plug.svg"),
  point: require("../../../.assets/point.svg"),
  brush: require("../../../.assets/brush.svg"),
  collaborate: require("../../../.assets/collaborate.svg"),
};

const imagesAltText = {
  flexible:
    "Carbon is beautiful out-of-the-box, down to colours, icons, and style.",
  hammer: "Hundreds of thousands of users worldwide help Carbon evolve.",
  plug:
    "Carbon powers your app. Contribute your code, so you can power Carbon too.",
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
