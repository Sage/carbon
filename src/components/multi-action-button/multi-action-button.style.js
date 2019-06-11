import styled from 'styled-components';
import StyledButton from '../button/button.style';

const StyledMultiActionButton = styled.div`
  .carbon-multi-action-button--align-right {
    .carbon-multi-action-button__additional-buttons {
      ${StyledButton} {
        padding-left: 25px;
        padding-right: 25px;
        text-align: right;
      }
    }
  }

  .carbon-multi-action-button .carbon-split-button__toggle.carbon-multi-action-button__toggle--secondary{
    background-color: transparent;
    color: #255bc7;
  }

  .carbon-multi-action-button__additional-buttons {
    ${StyledButton} {
      border: none;
      border-radius: 0;
      color: #fff;
      display: block;
      margin-left: 0;
      min-width: 100%;
      padding-bottom: 5px;
      padding-top: 5px;
      text-align: left;

      &:hover {
        background-color: #163777;
      }
    }
  }

  .carbon-multi-action-button__additional-buttons--transparent {
    ${StyledButton} {
      color: #335B6D;

      &:focus {
        background-color: #fff;
        color: #335B6D;
        box-shadow: none;
        outline: 0;
      }

      &:hover,
      &:active {
        background-color: #E6EBED;
        color: #4782F7;
      }
    }
  }
`;

export default StyledMultiActionButton;
