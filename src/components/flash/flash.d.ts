import * as React from 'react';

export interface FlashProps {
  as?: flashTypes;
  onDismiss?: (...args: any[]) => any;
  message?: string;
  className?: string;
  open?: boolean;
  timeout?: number;
}

export type flashTypes =
  | 'default'
  | 'error'
  | 'help'
  | 'info'
  | 'maintenance'
  | 'new'
  | 'success'
  | 'warning';

declare const Flash: React.Component<FlashProps, {}>;
export default Flash;
