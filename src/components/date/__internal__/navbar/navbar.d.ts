export interface NavbarProps {
  onPreviousClick?: () => void;
  onNextClick?: () => void;
}

declare function Navbar(props: NavbarProps): JSX.Element;

export default Navbar;
