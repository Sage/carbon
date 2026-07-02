import styled from "styled-components";
import { margin } from "styled-system";

import Portrait from "../portrait";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import profileConfigSizes, { ProfileSize } from "./profile.config";
import { StyledPortraitContainer } from "../portrait/portrait.style";

interface ProfileRootStyleProps {
  $darkBackground?: boolean;
}

interface ProfileDetailsStyleProps {
  $size: ProfileSize;
}

const ProfileStyle = styled.div.attrs(applyBaseTheme)<ProfileRootStyleProps>`
  border-radius: inherit;
  color: ${({ $darkBackground }) =>
    $darkBackground
      ? "var(--container-standard-inverse-txt-default)"
      : "var(--container-standard-txt-default)"};
  background-color: ${({ $darkBackground }) =>
    $darkBackground ? "var(--colorsUtilityYin090)" : "transparent"};
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
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileCustomContentStyle,
};
