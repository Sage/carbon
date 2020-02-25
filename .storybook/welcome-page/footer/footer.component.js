import React from 'react';
import I18n from 'i18n-js';
import { Wrapper } from '../common.style';
import { Background, StyledFooter, Corporate, SageIcon, Legal } from './footer.style';

const Footer = () => (
  <Background>
    <StyledFooter>
      <Wrapper>
        <Corporate>
          <SageIcon />
          <Legal>
            { I18n.t('footer.legal') }
          </Legal>
        </Corporate>
      </Wrapper>
    </StyledFooter>
  </Background>
);

export default Footer;
