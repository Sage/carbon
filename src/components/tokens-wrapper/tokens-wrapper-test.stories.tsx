import React from "react";
import TokensWrapper from "./tokens-wrapper.component";

export default {
  title: "Tokens Wrapper/Test",
  includeStories: ["LightAndDarkMode"],
  component: TokensWrapper,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

const Scale = ({ title }: { title: string }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "8px",
    }}
  >
    <div
      style={{
        width: "64px",
        height: "64px",
        backgroundColor: `var(--${title})`,
        border: "1px solid #000",
        marginBottom: "4px",
      }}
    ></div>
    <span style={{ fontSize: "12px", textAlign: "center" }}>{title}</span>
  </div>
);

export const LightAndDarkMode = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      background: "var(--mode-color-bg-page)",
    }}
  >
    <Scale title="mode-color-action-main-default" />
    <Scale title="mode-color-action-main-hover" />
    <Scale title="mode-color-action-main-active" />
    <Scale title="mode-color-action-main-default-alt" />
    <Scale title="mode-color-action-main-hover-alt" />
    <Scale title="mode-color-action-main-active-alt" />
    <Scale title="mode-color-action-main-default-alt2" />
    <Scale title="mode-color-action-main-hover-alt2" />
    <Scale title="mode-color-action-main-default-alt3" />
  </div>
);
LightAndDarkMode.storyName = "Light and Dark Mode";
