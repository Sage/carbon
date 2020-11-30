import React from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Link as RouterLink, BrowserRouter as Router } from "react-router-dom";
import OptionsHelper from "../../utils/helpers/options-helper";
import Link from "./link.component";

export default {
  title: "Link/Test",
  component: Link,
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disabled: true,
    },
  },
};

export const Basic = () => {
  const children = text("children", "Link");
  const disabled = boolean("disabled", false);
  const href = text("href");
  const icon = select("icon", ["", ...OptionsHelper.icons], "");
  const iconAlign = select("iconAlign", OptionsHelper.alignBinary, "left");
  const tabbable = boolean("tabbable", true);
  const to = text("to", "");
  const tooltipMessage = icon ? text("tooltipMessage", "") : undefined;
  const tooltipPosition = tooltipMessage
    ? select(
        "tooltipPosition",
        OptionsHelper.positions,
        OptionsHelper.positions[0]
      )
    : undefined;
  const tooltipAlign = tooltipMessage
    ? select(
        "tooltipAlign",
        OptionsHelper.alignAroundEdges,
        OptionsHelper.alignAroundEdges[0]
      )
    : undefined;
  const hasOnClick = boolean("onClick", false);
  const onClick = hasOnClick ? action("click") : undefined;
  const target = text("target", "_blank");

  const link = (
    <Link
      disabled={disabled}
      href={href}
      icon={icon}
      iconAlign={iconAlign}
      tabbable={tabbable}
      to={to}
      tooltipMessage={tooltipMessage}
      tooltipPosition={tooltipPosition}
      tooltipAlign={tooltipAlign}
      onClick={onClick}
      routerLink={to ? RouterLink : undefined}
      target={target}
    >
      {children}
    </Link>
  );

  const routerLink = <Router>{link}</Router>;

  return <div style={{ margin: "64px" }}>{to ? routerLink : link}</div>;
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
