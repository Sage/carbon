import * as React from 'react';

export interface ColumnProps {
    /**
     * Classes to apply to the component.
     */
    className?: string;

    /**
     * Classes applied by row component to affect all rows
     */
    columnClasses?: string;

    /**
     * Alignment of content within column.
     */
    columnAlign?: 'left' | 'right';

    /**
     * Show a divide between columns. This is defined by the row component.
     */
    columnDivide?: boolean;

    /**
     * Offset this column by a certain number of columns.
     */
    columnOffset?: number | string;

    /**
     * Span this column by a certain number of columns.
     */
    columnSpan?: number | string;

}

declare const Column: React.ComponentType<ColumnProps>;

export default Column;
