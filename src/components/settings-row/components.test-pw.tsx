import React from "react";
import SettingsRow, { SettingsRowProps } from ".";
import Link from "../../components/link";

const SettingsRowDefault = (props: SettingsRowProps) => (
  <SettingsRow {...props} />
);

const SettingRowWithLinkDescription = (props: SettingsRowProps) => {
  const { description } = props;

  return (
    <SettingsRow
      {...props}
      description={
        <Link href="https://carbon.sage.com/?path=/docs/setting-row--default-story">
          {description || "foo"}
        </Link>
      }
    >
      Content for settings
    </SettingsRow>
  );
};

const SettingsRowWithHeadingTypes = () => (
  <>
    <SettingsRow
      headingType="h1"
      description="Description"
      title="This is a h1 Title"
    >
      Content for settings
    </SettingsRow>
    <SettingsRow
      headingType="h2"
      description="Description"
      title="This is a h2 Title"
    >
      Content for settings
    </SettingsRow>
    <SettingsRow
      headingType="h3"
      description="Description"
      title="This is a h3 Title"
    >
      Content for settings
    </SettingsRow>
    <SettingsRow
      headingType="h4"
      description="Description"
      title="This is a h4 Title"
    >
      Content for settings
    </SettingsRow>
    <SettingsRow
      headingType="h5"
      description="Description"
      title="This is a h5 Title"
    >
      Content for settings
    </SettingsRow>
  </>
);

export {
  SettingsRowDefault,
  SettingRowWithLinkDescription,
  SettingsRowWithHeadingTypes,
};
