import { SpaceProps } from "styled-system";
export interface DtProps extends SpaceProps {
  /** prop for dt text */
  children: string;
}

declare function DtComponent(props: DtProps): JSX.Element;

export default DtComponent;
