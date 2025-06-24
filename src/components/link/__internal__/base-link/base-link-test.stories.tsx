import { css } from "styled-components";

import React from "react";
import BaseLink from "./base-link.component";

export default {
  title: "Link/Test/BaseLink",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const AsALink = () => {
  return <BaseLink href="#">This is a link</BaseLink>;
};

export const AsAButton = () => {
  return (
    <BaseLink onClick={() => {}}>
      This is also a link, but renders as a button
    </BaseLink>
  );
};

const styleConfigs = (destructive = false, disabled = false) => ({
  primary: css`
    --bg-color: ${destructive ? "red" : "green"};
    --border-color: ${destructive ? "blue" : "yellow"};

    background-color: var(--bg-color);
    border: var(--border-color) 1px solid;
    width: fit-content;
    color: white;
    margin: 4px;
    padding: 8px;
    font-weight: 800;

    ${disabled
      ? `
        filter: brightness(0.3);
      `
      : `
        &:focus {
          outline: 2px solid cyan;
        }

        transition: background-color 0.3s, filter 0.3s;

        &:hover {
          filter: brightness(0.9);
        }
      `}
  `,
  secondary: css`
    --bg-color: transparent;
    --border-color: ${destructive ? "red" : "green"};
    --color: ${destructive ? "red" : "green"};

    background-color: var(--bg-color);
    border: var(--border-color) 1px solid;
    width: fit-content;
    color: var(--color);
    margin: 4px;
    padding: 8px;
    font-weight: 800;

    ${disabled
      ? `
        filter: brightness(0.3);
      `
      : `
        &:focus {
          outline: 2px solid cyan;
        }

        transition: color 0.3s, filter 0.3s;

        &:hover {
          filter: brightness(0.9);
        }
      `}
  `,
});

export const PrimaryStyles = () => {
  const { primary } = styleConfigs();
  return (
    <>
      <BaseLink styles={primary} href="#">
        Primary Link
      </BaseLink>

      <BaseLink styles={primary} onClick={() => {}}>
        Primary Button
      </BaseLink>
    </>
  );
};

export const SecondaryStyles = () => {
  const { secondary } = styleConfigs();
  return (
    <>
      <BaseLink styles={secondary} href="#">
        Secondary Link
      </BaseLink>

      <BaseLink styles={secondary} onClick={() => {}}>
        Secondary Button
      </BaseLink>
    </>
  );
};
