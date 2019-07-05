import styled from 'styled-components';
import baseTheme from '../../style/themes/base';

const RainbowStyle = styled.div`
    text-align: center;

    .highcharts-container {
        display: inline-block;
    }

    .highcharts-series path {
        transform-origin: 50% 35%;
        transform: scale(1);
        transition: transform 0.2s;
        visibility: visible;

        &:hover {
        transform: scale(1.25);
        }
    }

    .highcharts-title {
        color: ${({ theme }) => theme.rainbow.textColor};
        font-family: 'Lato', 'Helvetica Neue', Arial, sans-serif;
        font-size: 25px;
        font-weight: bold;
        line-height: 16px;
        text-align: center;
    }

    .highcharts-tooltip {
        font-family: 'Lato', 'Helvetica Neue', Arial, sans-serif;
        font-weight: bold;
        margin-top: 20px;
    }

    .highcharts-data-labels {
        text-align: center;
    }
`;

RainbowStyle.defaultProps = {
  theme: baseTheme
};

// eslint-disable-next-line import/prefer-default-export
export { RainbowStyle };
