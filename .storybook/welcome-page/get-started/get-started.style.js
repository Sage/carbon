import styled from 'styled-components';
import BackgroundSvg from './grid-bk.svg';

export const Wrapper = styled.div``;

export const GetStartedWrapper = styled.div`
  background-color: #262A33;
  background-image: url(${BackgroundSvg});
  bottom: 0;
  color: #FFFFFF;
  padding: 120px 0 110px;
  position: relative;
  text-align: center;
  width: 100%;
`;

export const Text = styled.span`
  display: block;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`;

export const CheckoutText = styled.span`
  display: block;
  font-size: 22px;
  margin-bottom: 40px;
`;
