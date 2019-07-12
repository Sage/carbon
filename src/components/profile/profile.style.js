import styled, { css } from 'styled-components';
import Portrait from '../portrait';
import baseTheme from '../../style/themes/base';
import profileConfigSizes from './profile.config';
import { isClassic } from '../../utils/helpers/style-helper';


const ProfileNameStyle = styled.span`
    font-weight: bold;
    display: inline-block;
    font-size: ${({ size }) => profileConfigSizes[size].nameSize};

    ${({ theme }) => isClassic(theme) && css`
      display: inline;
    `};
`;

const ProfileEmailStyle = styled.span`
    font-size: ${({ size }) => profileConfigSizes[size].emailSize};

    ${({ theme }) => isClassic(theme) && css`
      font-size: 14px;
    `};
`;

const ProfileStyle = styled.div`
    white-space: nowrap;
    color: ${({ theme }) => theme.text.color};

    ${({ theme }) => isClassic(theme) && css`
      color: rgba(0, 0, 0, 0.85);

      ${({ large }) => large && css`
        ${ProfileNameStyle} {
            font-size: 20px;
            font-weight: 400;
            line-height: 21px;
        }
      `}

    `};
`;

const ProfileDetailsStyle = styled.div`
  vertical-align: middle;
  display: inline-block;
  line-height: ${({ size }) => profileConfigSizes[size].lineHeight};
  margin-left: ${({ size }) => profileConfigSizes[size].marginLeft};

  ${({ theme }) => isClassic(theme) && css`
      line-height: 16px;
      margin-left: 14px;
    `};
`;

const ProfileAvatarStyle = styled(Portrait)`
  display: inline-block;
`;

ProfileStyle.defaultProps = {
  theme: baseTheme
};

ProfileNameStyle.defaultProps = {
  size: 'M',
  theme: baseTheme
};

ProfileEmailStyle.defaultProps = {
  size: 'M',
  theme: baseTheme
};

ProfileDetailsStyle.defaultProps = {
  size: 'M',
  theme: baseTheme
};

export {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileEmailStyle
};
