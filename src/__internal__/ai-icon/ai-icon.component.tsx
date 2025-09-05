import React from "react";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";

export const AiIcon = ({ ...rest }: TagProps) => (
  <svg
    {...tagComponent("ai-icon", rest)}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
  >
    <g clipPath="url(#a)">
      <path
        data-role="white-star"
        fill="#fff"
        d="m16.378 9.799-3.776-1.49a1.615 1.615 0 0 1-.91-.91l-1.49-3.775c-.537-1.364-2.466-1.364-3.004 0L5.708 7.4a1.615 1.615 0 0 1-.91.91L1.022 9.799c-1.363.537-1.363 2.466 0 3.004l3.776 1.49c.417.163.746.493.91.91l1.49 3.775c.538 1.363 2.467 1.363 3.005 0l1.489-3.776c.164-.416.494-.745.91-.91l3.776-1.489c1.364-.538 1.364-2.467 0-3.004Z"
      />
      <path
        data-role="green-circle"
        fill="#00D639"
        d="M17.172 5.655a2.827 2.827 0 1 0 0-5.655 2.827 2.827 0 0 0 0 5.655Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);

export const AiIconInverse = ({ ...rest }: TagProps) => (
  <svg
    {...tagComponent("ai-icon-inverse", rest)}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
  >
    <g clipPath="url(#a)">
      <path
        fill="#000"
        d="m16.378 9.799-3.776-1.49a1.616 1.616 0 0 1-.91-.91l-1.49-3.775c-.537-1.364-2.466-1.364-3.004 0L5.708 7.4a1.615 1.615 0 0 1-.91.91L1.022 9.799c-1.363.537-1.363 2.466 0 3.004l3.776 1.49c.417.163.746.493.91.91l1.49 3.775c.538 1.363 2.467 1.363 3.005 0l1.489-3.776c.164-.416.494-.745.91-.91l3.776-1.489c1.364-.538 1.364-2.467 0-3.004Z"
      />
      <path
        fill="#00D639"
        d="M17.172 5.655a2.827 2.827 0 1 0 0-5.655 2.827 2.827 0 0 0 0 5.655Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default AiIcon;
