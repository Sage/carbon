import styled, { css } from "styled-components";
import { CrumbProps } from "./crumb.component";
import Link from "../../link";

const StyledCrumb = styled(Link)<Pick<CrumbProps, "isCurrent">>`
  ${({ isCurrent }) =>
    isCurrent &&
    css`
      a {
        color: gray;
        text-decoration: none;
        cursor: text;

        :hover {
          color: gray;
          text-decoration: none;
          cursor: text;
        }
      }
    `}

  &:not(:last-of-type)::after {
    content: "/";
    margin: 0 8px;
    line-height: 16px;
    vertical-align: text-top;
    color: gray;
  }
`;

export default StyledCrumb;
