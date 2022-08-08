import styled from "styled-components";
import { margin } from "styled-system";

import Portrait from "../portrait";
import baseTheme from "../../style/themes/base";
import profileConfigSizes, { ProfileSize } from "./profile.config";

interface ProfileSizeProps {
  size?: ProfileSize;
}

interface ProfileHasSrcProps {
  hasSrc: boolean;
}

interface ProfileDetailsStyleProps
  extends ProfileSizeProps,
    ProfileHasSrcProps {}

const ProfileNameStyle = styled.span<ProfileSizeProps>`
  font-weight: bold;
  display: block;
  font-size: ${({ size = "M" }) => profileConfigSizes[size].nameSize};
`;

const ProfileEmailStyle = styled.span<ProfileSizeProps>`
  font-size: ${({ size = "M" }) => profileConfigSizes[size].emailSize};
`;

const ProfileStyle = styled.div<ProfileHasSrcProps>`
  white-space: nowrap;
  color: var(--colorsUtilityYin090);
  display: ${({ hasSrc }) => (hasSrc ? "flex" : "")};

  ${margin}
`;

const ProfileDetailsStyle = styled.div<ProfileDetailsStyleProps>`
  vertical-align: middle;
  display: inline-block;
  margin-top: ${({ hasSrc, size = "M" }) =>
    hasSrc ? profileConfigSizes[size].marginTop : ""};
  line-height: ${({ size = "M" }) => profileConfigSizes[size].lineHeight};
  margin-left: ${({ size = "M" }) => profileConfigSizes[size].marginLeft};
`;

const ProfileAvatarStyle = styled(Portrait)`
  display: inline-block;
`;

ProfileStyle.defaultProps = {
  theme: baseTheme,
};

export {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileEmailStyle,
};
