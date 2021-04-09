export interface ScrollableBlockProps {
  /** Children elements */
  children: React.ReactNode;
  /** set the colour variant for a menuType */
  variant?: "default" | "alternate";
}

declare function ScrollableBlock(props: ScrollableBlockProps): JSX.Element;

export default ScrollableBlock;
