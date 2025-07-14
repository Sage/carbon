import React, { useEffect, useState } from "react";
import {
  IconButton,
  WithTooltip,
  TooltipLinkList
} from "storybook/internal/components";
import compareBuild from "semver/functions/compare-build";

import { TOOL_ID } from "./constants";
import fetchData from "./fetch-data";

type VersionLink = {
  id: string;
  title: string;
  onClick: () => void;
  active: boolean;
  href: string;
  target: string;
};

const getDisplayedItems = (
  versions: Record<string, string>,
  onClick: VersionLink["onClick"],
) => {
  let formattedVersions: VersionLink[] = [];

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
    undefined,
  );
  const [currentVersion, setCurrentVersion] = useState("Latest");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const version = urlParams.get("v");

    if (version) {
      setCurrentVersion(`v${version}`);
    }

    const getData = async () => {
      try {
        const data = await fetchData();
        if (data) {
          setVersions(data.versions);
        } else {
          throw new Error("Failed to fetch metadata");
        }
      } catch (error) {
        console.error("Failed to retrieve version data:", error);
        setVersions(undefined);
      }
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
