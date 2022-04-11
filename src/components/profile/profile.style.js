import styled from "styled-components";
import { margin } from "styled-system";

import Portrait from "../portrait";
import baseTheme from "../../style/themes/base";
import profileConfigSizes from "./profile.config";

const ProfileNameStyle = styled.span`
  font-weight: bold;
  display: block;
  font: ${({ size }) => profileConfigSizes[size].nameFont};
`;

const ProfileEmailStyle = styled.span`
  font: ${({ size }) => profileConfigSizes[size].emailFont};
`;

const ProfileStyle = styled.div`
  white-space: nowrap;
  color: var(--colorsUtilityYin090);
  display: ${({ hasSrc }) => (hasSrc ? "flex" : "")};

  ${margin}
`;

const ProfileDetailsStyle = styled.div`
  vertical-align: middle;
  display: inline-block;
  margin-top: ${({ hasSrc, size }) =>
    hasSrc ? profileConfigSizes[size].marginTop : ""};
  line-height: ${({ size }) => profileConfigSizes[size].lineHeight};
  margin-left: ${({ size }) => profileConfigSizes[size].marginLeft};
`;

const ProfileAvatarStyle = styled(Portrait)`
  display: inline-block;
`;

ProfileStyle.defaultProps = {
  theme: baseTheme,
};

ProfileNameStyle.defaultProps = {
  size: "M",
};

ProfileEmailStyle.defaultProps = {
  size: "M",
};

ProfileDetailsStyle.defaultProps = {
  size: "M",
};

export {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileEmailStyle,
};
