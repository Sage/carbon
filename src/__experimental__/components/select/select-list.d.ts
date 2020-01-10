import * as React from 'react';

export interface SelectListProps {
  alwaysHighlight?: boolean;
  customFilter?: () => void; 
  children?: React.ReactNode;
  filterValue?: string;
  id?: string;
  isLoopable?: boolean;
  name?: string;
  leftChildren?: React.ReactNode;
  onLazyLoad? : () => void;
  onMouseDown? : () => void;
  onMouseEnter? : () => void;
  onMouseLeave? : () => void;
  onSelect? : () => void;
  target?: object;
}
declare const SelectList: React.ComponentType<SelectListProps>;
export default SelectList;
