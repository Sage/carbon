import styled, { css } from 'styled-components';
import classicProfileStyle from './profile-classic.style';
import Portrait from '../portrait/portrait';
import baseTheme from '../../style/themes/base';

const ProfileNameStyle = styled.span`
    font-weight: bold;
`;

const ProfileStyle = styled.div`
    white-space: nowrap;
    color: ${({ theme }) => theme.text.color};

    ${({ large }) => large && css`
        ${ProfileNameStyle} {
            font-size: 20px;
            font-weight: 400;
            line-height: 21px;
        }
    `}
    ${classicProfileStyle}
`;

const ProfileDetailsStyle = styled.div`
  margin-left: 14px;
  vertical-align: middle;
  display: inline-block;
  line-height: 16px;
`;

const ProfileAvatarStyle = styled(Portrait)`
  display: inline-block;
`;

ProfileStyle.defaultProps = {
  theme: baseTheme
};

export {
  ProfileStyle,
  ProfileNameStyle,
  ProfileDetailsStyle,
  ProfileAvatarStyle
};
