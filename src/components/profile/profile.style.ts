import styled, { SimpleInterpolation, css } from "styled-components";
import { margin } from "styled-system";

import Portrait from "../portrait";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import profileConfigSizes, { ProfileSize } from "./profile.config";
import { StyledPortraitContainer } from "../portrait/portrait.style";

interface ProfileSProps {
  size?: ProfileSize;
  hasSrc?: boolean;
  darkBackground?: boolean;
}

const ProfileNameStyle = styled.span<ProfileSProps>`
  font-weight: 500;
  font-size: ${({ size = "M" }) => profileConfigSizes[size].nameSize};
`;

const profileEmailStyle = (
  baseStyles: SimpleInterpolation,
  size?: ProfileSize,
  darkBackground?: boolean,
) => css`
  ${baseStyles}
  a {
    ${size && `font-size: ${profileConfigSizes[size].emailSize}`};
    ${darkBackground && "color: var(--colorsActionMajor350)"};
  }
`;

const ProfileTextStyle = styled.span<ProfileSProps>`
  font-size: ${({ size = "M" }) => profileConfigSizes[size].emailSize};
`;

const ProfileStyle = styled.div.attrs(applyBaseTheme)<
  Pick<ProfileSProps, "hasSrc" | "darkBackground">
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

const ProfileDetailsStyle = styled.div<Pick<ProfileSProps, "hasSrc" | "size">>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: ${({ size = "M" }) => profileConfigSizes[size].lineHeight};
  margin-left: ${({ size = "M" }) => profileConfigSizes[size].marginLeft};
`;

const ProfileAvatarStyle = styled(Portrait)`
  display: inline-block;
`;

export {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  profileEmailStyle,
  ProfileTextStyle,
};
