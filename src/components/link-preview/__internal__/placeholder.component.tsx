import React from "react";
import styled from "styled-components";

export const StyledPlaceHolder = styled.div`
  position: absolute;
  inset: 0;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Placeholder = () => (
  <StyledPlaceHolder data-component="link-preview-placeholder">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="160"
      height="90"
      viewBox="0 0 160 90"
      fill="none"
      aria-hidden="true"
    >
      <g clipPath="url(#a)">
        <path fill="#fff" d="M0 0h160v90H0z" />
        <circle cx="55" cy="24" r="7" fill="#d1d1d1" />
        <rect
          width="120.67"
          height="120.75"
          fill="#eaeaea"
          rx="1.96"
          transform="rotate(43.49 -29.82 90.72)skewX(.64)"
        />
        <rect
          width="120.67"
          height="120.75"
          fill="url(#b)"
          fillOpacity=".05"
          rx="1.96"
          transform="rotate(43.49 -29.82 90.72)skewX(.64)"
        />
        <rect
          width="120.67"
          height="120.75"
          fill="#d4d4d4"
          rx="1.96"
          transform="rotate(43.49 11.3 141.27)skewX(.64)"
        />
        <rect
          width="120.67"
          height="120.75"
          fill="url(#c)"
          fillOpacity=".2"
          rx="1.96"
          transform="rotate(43.49 11.3 141.27)skewX(.64)"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1="22.48"
          x2="3.83"
          y1="46.88"
          y2=".45"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="60.08"
          x2="-12.97"
          y1="40.62"
          y2="15.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h160v90H0z" />
        </clipPath>
      </defs>
    </svg>
  </StyledPlaceHolder>
);

export default Placeholder;
