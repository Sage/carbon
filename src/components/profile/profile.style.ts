import styled from "styled-components";
import { margin } from "styled-system";

import Portrait from "../portrait";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import profileConfigSizes, { ProfileSize } from "./profile.config";
import Link from "../link";
import { StyledPortraitContainer } from "../portrait/portrait.style";
import Typography from "../typography";

interface ProfileSProps {
  $size?: ProfileSize;
  darkBackground?: boolean;
}

const ProfileNameStyle = styled(Typography).attrs({
  variant: "span",
})<Pick<ProfileSProps, "$size" | "darkBackground">>`
  font: ${({ $size = "M" }) => profileConfigSizes[$size].nameFont};
  color: ${({ darkBackground }) =>
    darkBackground ? "inherit" : "var(--profile-label-default)"};
`;

const ProfileEmailStyle = styled(Link)<
  Pick<ProfileSProps, "$size" | "darkBackground">
>`
  a {
    font-size: ${({ $size = "M" }) => profileConfigSizes[$size].emailFontSize};
    color: ${({ darkBackground }) =>
      darkBackground && "var(--colorsActionMajor350)"};
    line-height: ${({ $size = "M" }) =>
      profileConfigSizes[$size].emailLineHeight};
  }
`;

const ProfileTextStyle = styled(Typography).attrs({
  variant: "span",
})<Pick<ProfileSProps, "$size" | "darkBackground">>`
  font: ${({ $size = "M" }) => profileConfigSizes[$size].textFont};
  color: ${({ darkBackground }) =>
    darkBackground ? "inherit" : "var(--profile-label-default)"};
`;

const ProfileStyle = styled.div.attrs(applyBaseTheme)<
  Pick<ProfileSProps, "darkBackground">
>`
  border-radius: inherit;
  color: ${({ darkBackground }) =>
    darkBackground
      ? "var(--colorsUtilityReadOnly600)"
      : "var(--colorsUtilityYin090)"};
  background-color: ${({ darkBackground }) =>
    darkBackground ? "var(--colorsUtilityYin090)" : "transparent"};
  display: flex;
  flex-direction: row;
  align-items: center;
  ${margin}

  ${StyledPortraitContainer} {
    flex-shrink: 0;
  }
`;

const ProfileCustomContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
`;

const ProfileDetailsStyle = styled.div<Pick<ProfileSProps, "$size">>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${({ $size = "M" }) =>
    profileConfigSizes[$size].detailsMarginLeft};
  min-width: 0;
  word-wrap: break-word;
`;

const ProfileAvatarStyle = styled(Portrait)`
  display: inline-block;
`;

export {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileEmailStyle,
  ProfileTextStyle,
  ProfileCustomContentStyle,
};
