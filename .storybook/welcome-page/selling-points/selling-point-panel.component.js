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

export default ({ icon, heading, text }) => (
  <Panel>
    <Image src={images[icon]} />
    <Heading>{heading}</Heading>
    <Text>{text}</Text>
  </Panel>
);
