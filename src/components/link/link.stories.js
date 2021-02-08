import React from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
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
      disable: true,
    },
  },
};

export const Default = () => {
  const children = text("children", "Link");
  const disabled = boolean("disabled", false);
  const href = text("href");
  const icon = select("icon", ["", ...OptionsHelper.icons], "");
  const iconAlign = select("iconAlign", OptionsHelper.alignBinary, "left");
  const tabbable = boolean("tabbable", true);
  const tooltipMessage = icon ? text("tooltipMessage", "") : undefined;
  const tooltipPosition = tooltipMessage
    ? select(
        "tooltipPosition",
        OptionsHelper.positions,
        OptionsHelper.positions[0]
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
