import React, { useEffect, useState } from "react";
import {
  IconButton,
  WithTooltip,
  TooltipLinkList,
  TooltipLinkListLink,
} from "@storybook/components";
import compareBuild from "semver/functions/compare-build";

import { TOOL_ID } from "./constants";
import fetchData from "./fetch-data";

const getDisplayedItems = (
  versions: Record<string, string>,
  onClick: TooltipLinkListLink["onClick"]
) => {
  let formattedVersions: TooltipLinkListLink[] = [];

  for (const [key, value] of Object.entries(versions)) {
    formattedVersions.push({
      id: key,
      title: key,
      onClick,
      active: false,
      href: value,
      target: "_blank",
    });
  }

  formattedVersions.sort((a, b) => compareBuild(b.id, a.id));

  formattedVersions[0].title = `${formattedVersions[0].title} (latest)`;

  return formattedVersions;
};

export const VersionPicker = () => {
  const [versions, setVersions] = useState<Record<string, string> | undefined>(
    undefined
  );
  const [currentVersion, setCurrentVersion] = useState("Latest");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const version = urlParams.get("v");

    if (version) {
      setCurrentVersion(`v${version}`);
    }

    const getData = async () => {
      const data = await fetchData();
      setVersions(data.versions);
    };

    getData();
  }, []);

  if (versions) {
    return (
      <WithTooltip
        placement="top"
        trigger="click"
        closeOnOutsideClick
        tooltip={({ onHide }) => {
          return (
            <TooltipLinkList links={getDisplayedItems(versions, onHide)} />
          );
        }}
      >
        <IconButton
          key={TOOL_ID}
          active={false}
          title="Open docs for a different version"
        >
          {`${currentVersion}`}
        </IconButton>
      </WithTooltip>
    );
  }

  return null;
};
