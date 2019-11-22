import React, { useCallback, useState } from 'react';
import AppWrapper from 'carbon-react/lib/components/app-wrapper';
import ButtonToggleGroup from 'carbon-react/lib/components/button-toggle-group';
import ButtonToggle from 'carbon-react/lib/components/button-toggle';
import { Menu, MenuItem } from 'carbon-react/lib/components/menu';
import I18n from 'i18n-js';
import styled from 'styled-components';
import Log, { LogProvider } from './log';

I18n.translations.ch = {
  number: {
    format: {
      delimiter: '\'',
      separator: '.'
    }
  }
};

I18n.translations.fr = {
  number: {
    format: {
      delimiter: '.',
      separator: ','
    }
  }
};

I18n.translations.en = {
  number: {
    format: {
      delimiter: ',',
      separator: '.'
    }
  }
};

const Chrome = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [key, setKey] = useState(1);
  const [lang, setLang] = useState('');
  const onChange = (e) => {
    I18n.locale = e.target.value;
    setKey(key + 1);
    setLang(e.target.value);
  };

  const log = useCallback(({
    target: {
      name, id, value, checked
    }
  }, obj) => {
    setHistory([...history, {
      ...obj,
      timestamp: Date.now(),
      name,
      id,
      value,
      checked
    }]);
  }, [history, setHistory]);

  const Nav = styled.div`
  display:flex
  justify-content:space-between
  `;

  return (
    <AppWrapper key={ key }>
      <Nav>
        <Menu>
          <MenuItem to='/'>
            Index
          </MenuItem>
        </Menu>
        <ButtonToggleGroup
          id='lang'
          value={ lang } onChange={ onChange }
          name='lang'
        >
          <ButtonToggle value='en'>EN</ButtonToggle>
          <ButtonToggle value='fr'>FR</ButtonToggle>
          <ButtonToggle value='ch'>CH</ButtonToggle>
          <ButtonToggle value=''>None</ButtonToggle>
        </ButtonToggleGroup>
      </Nav>
      <LogProvider value={ log }>{children}</LogProvider>
      <Log history={ history } />
    </AppWrapper>
  );
};

export default Chrome;
