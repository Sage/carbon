import React from "react";

import Star from "./star.component";
import { StyledStars } from "../loader.style";

const StarsLoader = () => (
  <StyledStars>
    <Star starContainerClassName="star-1" gradientId="gradient1" />
    <Star starContainerClassName="star-2" gradientId="gradient2" />
    <Star starContainerClassName="star-3" gradientId="gradient3" />
  </StyledStars>
);

export default StarsLoader;
