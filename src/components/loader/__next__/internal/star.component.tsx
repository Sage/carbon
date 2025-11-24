import React from "react";

import {
  GradientStopBottom,
  GradientStopTop,
  StyledLoaderStarContainer,
  StyledStarSVG,
} from "./star.style";

interface StarProps {
  starContainerClassName: "star-1" | "star-2" | "star-3";
  gradientId: "gradient1" | "gradient2" | "gradient3";
}

const Star = ({
  starContainerClassName,
  gradientId,
}: StarProps): JSX.Element => {
  return (
    <StyledLoaderStarContainer
      data-component="star"
      role="presentation"
      className={starContainerClassName}
    >
      <StyledStarSVG
        className="ai-star-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 217 216"
      >
        <path
          className="ai-star-path"
          fill="#000"
          fillRule="evenodd"
          d="M108.502 215.994c-.166.006-.334.006-.502.006-7.218 0-11.975-3.217-15.497-8.335-4.396-5.656-7.56-13.591-10.338-21.896l-.597-1.807-.667-2.063-.91-2.87-1.225-3.904c-1.831-5.82-3.65-11.42-5.751-16.135-1.456-2.661-3.075-5.078-4.921-7.146-.356-.391-.72-.777-1.094-1.156-4.054-4.038-9.808-7.093-16.262-9.726-14.49-4.937-33.33-8.698-43.486-17.634C2.766 119.712 0 114.918 0 108l.003-.413c.108-6.697 2.852-11.372 7.25-14.916 10.155-8.935 28.995-12.696 43.485-17.633C57.192 72.405 62.946 69.35 67 65.312c.373-.38.738-.765 1.094-1.156 1.846-2.068 3.465-4.485 4.922-7.145 2.567-5.764 4.713-12.849 6.976-20.04l.91-2.87.666-2.063.338-1.028c2.84-8.586 6.063-16.843 10.598-22.675C95.954 3.32 100.592.13 107.57.004L108 0c.168 0 .336 0 .502.006L109 0l.405.003c6.999.119 11.645 3.316 15.102 8.347 5.071 6.529 8.5 16.09 11.592 25.75l.335 1.054 2.362 7.501c1.645 5.178 3.304 10.125 5.19 14.358 1.456 2.66 3.074 5.075 4.92 7.142.356.392.72.778 1.094 1.157 4.054 4.038 9.808 7.093 16.262 9.726 14.49 4.937 33.33 8.698 43.486 17.634C214.234 96.288 217 101.082 217 108c0 6.918-2.766 11.712-7.252 15.328-10.156 8.936-28.996 12.697-43.486 17.634-6.454 2.633-12.208 5.688-16.262 9.726-.373.38-.738.765-1.094 1.157-1.846 2.067-3.464 4.482-4.92 7.142-1.886 4.233-3.545 9.18-5.19 14.358l-2.362 7.5-.335 1.054c-3.091 9.66-6.521 19.222-11.592 25.751-3.524 5.127-8.282 8.35-15.507 8.35l-.498-.006Z"
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <GradientStopTop offset="0%" />
            <GradientStopBottom offset="100%" />
          </linearGradient>
        </defs>
      </StyledStarSVG>
    </StyledLoaderStarContainer>
  );
};

Star.displayName = "Star";
export default Star;
