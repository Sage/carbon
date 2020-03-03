import styled from 'styled-components';

export const HeadingBackgroundWrapper = styled.div`
  background: linear-gradient(80deg,#2f355a,#343f80);
  height: 100%;
  left: 0;
  position: relative;
  right: 0;
  width: 100%;
  z-index: 1;
`;

export const HeadingContentWrapper = styled.div`
  padding: 120px 0;
  position: relative;
  text-align: center;
  color: #fff;

  h1 {
    font-weight: 900
    font-size: 40px;
    line-height: normal;
    margin: 0 auto;
    max-width: 1000px;
  }

  h2 {
    font-weight: 700;
    font-size: 22px;
    line-height: normal;
    margin-top: 16px;
    margin-bottom: 26px;
  }
`;

export const CodeButtonWrapper = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 8px;
`;

export const GitHubLinkWrapper = styled.div`
  font-weight: 100;
  letter-spacing: .3px;
  margin-top: 40px;
`;
