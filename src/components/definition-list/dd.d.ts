import * as React from 'react';

export interface DdProps {
    /** Prop for what will render in the `<Dd></Dd>` tags */
    children: React.ReactNode;
}

declare const DdComponent: React.ComponentType<DdProps>;
export default DdComponent;
