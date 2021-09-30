import * as React from "react";

export interface SlideProps {
  theme?: Record<string, unknown>;
}

declare function Slide(props: React.PropsWithChildren<SlideProps>): JSX.Element;

export default Slide;
