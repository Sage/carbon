import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic
  && css`
    ${({ position }) => position === 'top'
      && css`
        margin-top: 15px;
      `}

    ${({ position }) => position === 'left'
      && css`
        display: flex;
        width: 100%;

        .carbon-tabs__headers {
          box-shadow: inset -2px 0px 0px 0px #ccd6db;
          display: inline-block;
          width: 20%;
        }

        .carbon-tabs__headers {
          margin: 0 10px 0;

          .carbon-tabs__headers__header {
            border-bottom: 0px;
            border-right: 2px solid #ccd6db;
            display: block;
            height: auto;
            margin-left: 0px;
            margin-top: 2px;

            &:first-child {
              margin-top: 0;
            }

            &:hover {
              border-right-color: $carbon-tabs__header--selected_border-color;
            }
          }

          .carbon-tabs__headers__header--selected {
            border-right-color: $carbon-tabs__header--selected_border-color;
          }
        }
      `}
  `;
