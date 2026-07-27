import styled from "styled-components";
import { margin } from "styled-system";

import Portrait from "../portrait";
import Typography from "../typography";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import profileConfigSizes, { ProfileSize } from "./profile.config";
import { StyledPortraitContainer } from "../portrait/portrait.style";

interface ProfileRootStyleProps {
  $darkBackground?: boolean;
}

interface ProfileDetailsStyleProps {
  $size: ProfileSize;
}

interface ProfileNameStyleProps extends ProfileRootStyleProps {
  $font: string;
}

const ProfileStyle = styled.div.attrs(applyBaseTheme)<ProfileRootStyleProps>`
  border-radius: inherit;
  color: ${({ $darkBackground }) =>
    $darkBackground
      ? "var(--container-standard-inverse-txt-default)"
      : "var(--profile-label-default)"};
  background-color: ${({ $darkBackground }) =>
    $darkBackground
      ? "var(--container-standard-inverse-bg-default)"
      : "transparent"};
  display: flex;
  flex-direction: row;
  align-items: center;
  ${margin}

  ${StyledPortraitContainer} {
    flex-shrink: 0;
  }
`;

const ProfileAvatarStyle = styled(Portrait)`
  display: inline-block;
`;

const ProfileNameStyle = styled.span<ProfileNameStyleProps>`
  color: ${({ $darkBackground }) =>
    $darkBackground
      ? "var(--container-standard-inverse-txt-default)"
      : "var(--profile-label-default)"};
  font: ${({ $font }) => $font};
`;

const ProfileTypography = styled(Typography)<ProfileRootStyleProps>`
  color: ${({ $darkBackground }) =>
    $darkBackground
      ? "var(--container-standard-inverse-txt-default)"
      : "var(--profile-label-default)"};
`;

const ProfileDetailsStyle = styled.div<ProfileDetailsStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${({ $size }) => profileConfigSizes[$size].detailsMarginLeft};
  min-width: 0;
  word-wrap: break-word;
`;

const ProfileCustomContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
`;

export {
  ProfileStyle,
  ProfileNameStyle,
  ProfileTypography,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileCustomContentStyle,
};
