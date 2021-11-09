import React, { memo, useState } from "react";
import { getThemeName, setThemeName, modernThemes } from ".";
import { withTheme } from "@storybook/theming";
import {
  IconButton,
  WithTooltip,
  TooltipLinkList,
  Icons,
} from "@storybook/components";
import addons, { types } from "@storybook/addons";
import { FORCE_RE_RENDER } from "@storybook/core-events";
import styled from "styled-components";

addons.register("sage/theme-switcher", (api) => {
  addons.add("sage/theme-switcher", {
    title: "theme-switcher",
    type: types.TOOL,
    match: ({ viewMode }) => ["story", "docs"].includes(viewMode),
    render: () => <ThemeSwitcher api={api} />,
  });
});

const IconButtonWithLabel = styled(IconButton)`
  display: inline-flex;
  align-items: center;
  width: 70px;
  cursor: ${({ disabled }) =>
    disabled ? "not-allowed" : "pointer"} !important;
  && {
    justify-content: flex-start;
  }
`;

const IconButtonLabel = withTheme(styled.div`
  font-size: ${({ theme }) => theme.typography.size.s2 - 1}px;
  margin-left: 10px;
`);

const ThemeIcon = styled.span`
  height: 1rem;
  width: 1rem;
  display: block;
  background: ${({ background }) => background};
`;

export const ThemeSwitcher = memo(
  withTheme(({ api }) => {
    const [activeTheme, setTheme] = useState(getThemeName());
    const [expanded, setExpanded] = useState(false);

    if (process.env.STORYBOOK_DEBUG_ALL_THEMES) {
      modernThemes.all = {
        colors: {
          primary:
            "linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet, red)",
        },
      };
    }

    const themeList = Object.keys(modernThemes).map((themeName) => ({
      id: themeName,
      title: themeName,
      onClick: () => {
        setTheme(themeName);
        setThemeName(themeName);
        addons.getChannel().emit(FORCE_RE_RENDER);
      },
      right: <ThemeIcon background={modernThemes[themeName].colors.primary} />,
    }));

    return (
      <WithTooltip
        placement="top"
        trigger="click"
        tooltipShown={expanded}
        onVisibilityChange={(s) => setExpanded(s)}
        tooltip={<TooltipLinkList links={themeList} />}
        closeOnClick
      >
        <IconButtonWithLabel>
          <Icons icon="paintbrush" />
          <IconButtonLabel>{activeTheme}</IconButtonLabel>
        </IconButtonWithLabel>
      </WithTooltip>
    );
  })
);
