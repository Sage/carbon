import styled, { css } from 'styled-components';
import Portrait from '../portrait';
import baseTheme from '../../style/themes/base';
import { THEMES } from '../../style/themes';

const portraitSizes = {
  'extra-small': {
    dimensions: 24,
    nameSize: '13px',
    emailSize: '12px',
    lineHeight: '12px',
    marginLeft: '16px'
  },
  small: {
    dimensions: 32,
    nameSize: '14px',
    emailsize: '12px',
    lineHeight: '16px',
    marginLeft: '16px'
  },
  'medium-small': {
    dimensions: 40,
    nameSize: '14px',
    emailSize: '14px',
    lineHeight: '16px',
    marginLeft: '16px'
  },
  medium: {
    dimensions: 56,
    nameSize: '14px',
    emailSize: '14px',
    lineHeight: '20px',
    marginLeft: '24px'
  },
  'medium-large': {
    dimensions: 72,
    nameSize: '20px',
    emailSize: '14px',
    lineHeight: '22px',
    marginLeft: '24px'
  },
  large: {
    dimensions: 104,
    nameSize: '24px',
    emailSize: '20px',
    lineHeight: '26px',
    marginLeft: '32px'
  },
  'extra-large': {
    dimensions: 128,
    nameSize: '24px',
    emailSize: '20px',
    lineHeight: '30px',
    marginLeft: '40px'
  }
};

const ProfileNameStyle = styled.span`
    font-weight: bold;
    display: inline-block;
    font-size: ${props => portraitSizes[props.size].nameSize};

    ${({ theme }) => theme.name === THEMES.classic && css`
      display: inline;
    `};
`;

const ProfileEmailStyle = styled.span`
    font-size: ${({ size }) => portraitSizes[size].emailSize};

    ${({ theme }) => theme.name === THEMES.classic && css`
      font-size: 14px;
    `};
`;

const ProfileStyle = styled.div`
    white-space: nowrap;
    color: ${({ theme }) => theme.text.color};

    ${({ theme }) => theme.name === THEMES.classic && css`
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
  line-height: ${({ size }) => portraitSizes[size].lineHeight};
  margin-left: ${({ size }) => portraitSizes[size].marginLeft};

  ${({ theme }) => theme.name === THEMES.classic && css`
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
  size: 'medium-small',
  theme: baseTheme
};

ProfileEmailStyle.defaultProps = {
  size: 'medium-small',
  theme: baseTheme
};

ProfileDetailsStyle.defaultProps = {
  size: 'medium-small',
  theme: baseTheme
};

export {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle,
  ProfileEmailStyle
};
