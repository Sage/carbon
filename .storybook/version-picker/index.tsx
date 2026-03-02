import React, { useEffect, useState } from "react";
import {
  IconButton,
  WithTooltip,
  ActionList,
} from "storybook/internal/components";
import compareBuild from "semver/functions/compare-build";

import { TOOL_ID } from "./constants";
import fetchData from "./fetch-data";

interface VersionLink {
  id: string;
  title: string;
  onClick: () => void;
  active: boolean;
  href: string;
}

const getDisplayedItems = (
  versions: Record<string, string>,
  onHide: () => void,
): VersionLink[] => {
  const formattedVersions = Object.entries(versions)
    .reduce<(VersionLink & { title: string })[]>(
      (acc, [key, value]) => {
        if (!key.match(/-beta\.\d+$/)) {
          acc.push({
            id: key,
            title: key,
            onClick: onHide,
            active: false,
            href: value,
          });
        }
        return acc;
      },
      [],
    )
    .sort((a, b) => compareBuild(b.id, a.id));

  formattedVersions[0].title = `${formattedVersions[0].title} (latest)`;

  return formattedVersions;
};

const VersionPicker = () => {
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
        // eslint-disable-next-line no-console
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
          const items = getDisplayedItems(versions, onHide);
          return (
            <ActionList>
              {items.map((item) => (
                <ActionList.Item key={item.id}>
                  <ActionList.Button
                    ariaLabel={false}
                    onClick={() => {
                      window.location.href = item.href;
                      item.onClick();
                    }}
                  >
                    {item.title}
                  </ActionList.Button>
                </ActionList.Item>
              ))}
            </ActionList>
          );
        }}
      >
        <IconButton
          key={TOOL_ID}
          active={false}
          ariaLabel={false}
          title="Open docs for a different version"
        >
          {`${currentVersion}`}
        </IconButton>
      </WithTooltip>
    );
  }

  return null;
};

export default VersionPicker;
