import { css } from 'styled-components';

const applyClassicInternalStyling = () => {
  return css`
    background-color: #F2F4F5;
    border-radius: 0px;
    border: 1px solid #CCD6DA;
    overflow: visible;
    position: relative;
  `;
};

const applyClassicTableStyling = (props) => {
  return css`
    background-color: #ffffff;
    border-collapse: separate;
    border-radius: 0px;
    border-spacing: 0;
    min-width: 100%;
    table-layout: fixed;
    width: auto;
    word-break: break-all;
      
    .carbon-spinner {
      height: 8px;
      width: 8px;
      margin-bottom: -4px;
    }

    ${props.caption && `
      & caption {
        clip: rect(1px, 1px, 1px, 1px);
        height: 1px;
        overflow: hidden;
        position: absolute !important;
        width: 1px;
        position: absolute;
        top: -99999px;
      }
    `}

    ${props.paginate && `
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
  `;
};

export {
  applyClassicInternalStyling,
  applyClassicTableStyling
};

// what do the mainclasses do?
// CSStansition component

// carbon-table--configurable {
//   &.carbon-table__wrapper, .carbon-table__table {
//     border-radius: 0 $tables__border-radius $tables__border-radius $tables__border-radius;
//   }
// } CONFUSING
