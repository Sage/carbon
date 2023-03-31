import React from "react";
import { ComponentStory } from "@storybook/react";

import { Breadcrumbs } from ".";
import { Crumb } from "./crumb";

// eslint-disable-next-line import/prefer-default-export
export const DefaultBreadcrumbs: ComponentStory<typeof Breadcrumbs> = () => {
  return (
    <Breadcrumbs>
      <Crumb href="#">Breadcrumb 1</Crumb>
      <Crumb href="#">Breadcrumb 2</Crumb>
      <Crumb href="#">Breadcrumb 3</Crumb>
      <Crumb href="#" isCurrent>
        Current Page
      </Crumb>
    </Breadcrumbs>
  );
};
