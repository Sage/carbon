import React, { useCallback, useState, useRef } from 'react';
import AppWrapper from 'carbon-react/lib/components/app-wrapper';
import ButtonToggleGroup from 'carbon-react/lib/components/button-toggle-group';
import ButtonToggle from 'carbon-react/lib/components/button-toggle';
import { Menu, MenuItem } from 'carbon-react/lib/components/menu';
import I18n from 'i18n-js';
import styled from 'styled-components';
import guid from 'carbon-react/lib/utils/helpers/guid';
import Log, { LogProvider } from './log';

I18n.translations['fr-ch'] = {
  number: {
    format: {
      delimiter: '\'',
      separator: '.'
    }
  },
  date: {
    formats: {
      javascript: 'DD.MM.YYYY'
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

I18n.translations.de = {
  date: {
    formats: {
      javascript: 'DD.MM.YYYY'
    }
  },
  number: {
    format: {
      delimiter: '.',
      separator: ','
    }
  }
};

const Chrome = ({ children }) => {
  const ref = useRef([]);
  const [history, setHistory] = useState(ref.current);
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
    ref.current = [...ref.current, {
      ...obj,
      guid: guid(),
      timestamp: new Date().toISOString(),
      name,
      id,
      value,
      checked
    }];
    setHistory(ref.current);
  }, [ref, setHistory]);

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
          <ButtonToggle value='fr-ch'>CH</ButtonToggle>
          <ButtonToggle value='de'>DE</ButtonToggle>
          <ButtonToggle value=''>None</ButtonToggle>
        </ButtonToggleGroup>
      </Nav>
      <LogProvider value={ log }>{children}</LogProvider>
      <Log history={ history } />
    </AppWrapper>
  );
};

export default Chrome;
