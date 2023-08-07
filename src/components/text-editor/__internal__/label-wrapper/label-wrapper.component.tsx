/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
/**
 * TextEditor component is composed with divs and spans.
 * We have to manually trigger focus on TextEditor by clicking on label component.
 * This wrapper allows us to trigger focus on TextEditor
 */

export interface LabelWrapperProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

const LabelWrapper = ({ onClick, children }: LabelWrapperProps) => {
  return <span onClick={onClick}> {children} </span>;
};

export default LabelWrapper;
