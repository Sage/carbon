import styled, { css } from "styled-components";
import Portrait from "../portrait";
import baseTheme from "../../style/themes/base";
import profileConfigSizes from "./profile.config";

const ProfileNameStyle = styled.span`
  font-weight: bold;
  display: block;
  font-size: ${({ size }) => profileConfigSizes[size].nameSize};
`;

const ProfileEmailStyle = styled.span`
  font-size: ${({ size }) => profileConfigSizes[size].emailSize};
`;

const ProfileStyle = styled.div`
  white-space: nowrap;
  ${({ theme }) =>
    css`
      color: ${theme.text.color};
    `};

  display: ${({ hasSrc }) => (hasSrc ? "flex" : "")};
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
  theme: baseTheme,
};

ProfileEmailStyle.defaultProps = {
  size: "M",
  theme: baseTheme,
};

ProfileDetailsStyle.defaultProps = {
  size: "M",
  theme: baseTheme,
};

export {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileEmailStyle,
};
