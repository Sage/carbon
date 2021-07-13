import * as React from "react";

export interface MenuFullscreenProps {
   /** The child elements to render */
   children?: React.ReactNode;
   /** Sets whether the component is open or closed */
   isOpen?: boolean;
   /** The start position for the component to open from */
   startPosition?: "left" | "right";
   /** A callback to be called when the close icon is clicked or enter is pressed when focused */
   onClose: React.MouseEventHandler<HTMLButtonElement>;
}

declare function MenuFullscreen(props: MenuFullscreenProps): JSX.Element;

export default MenuFullscreen;
