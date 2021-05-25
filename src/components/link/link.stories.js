import React from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Link from "./link.component";
import { ICONS } from "../icon/icon-config";
import { LINK_ALIGNMENTS, LINK_POSITIONS } from "./link.config";

export default {
  title: "Link/Test",
  component: Link,
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disable: true,
    },
  },
};

export const Default = () => {
  const children = text("children", "Link");
  const disabled = boolean("disabled", false);
  const href = text("href");
  const icon = select("icon", ["", ...ICONS], "");
  const iconAlign = select("iconAlign", LINK_ALIGNMENTS, "left");
  const tabbable = boolean("tabbable", true);
  const tooltipMessage = icon ? text("tooltipMessage", "") : undefined;
  const tooltipPosition = tooltipMessage
    ? select("tooltipPosition", LINK_POSITIONS, LINK_POSITIONS[0])
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
      tooltipMessage={tooltipMessage}
      tooltipPosition={tooltipPosition}
      onClick={onClick}
      target={target}
    >
      {children}
    </Link>
  );

  return <div style={{ margin: "64px" }}>{link}</div>;
};

Default.story = {
  name: "default",
};
