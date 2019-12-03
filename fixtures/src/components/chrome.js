import React, { useCallback, useState, useRef } from 'react';
import Link from 'carbon-react/lib/components/link';
import AppWrapper from 'carbon-react/lib/components/app-wrapper';
import Log, { LogProvider } from './log';

const Chrome = ({ children }) => {
  const [history, setHistory] = useState([]);
  const refHistory = useRef([]);

  const log = useCallback(({
    target: {
      name, id, value, checked
    }
  }, obj) => {
    refHistory.current = [...refHistory.current, {
      ...obj,
      timestamp: Date.now(),
      name,
      id,
      value,
      checked
    }];
    setHistory(refHistory.current);
  }, [history, refHistory, setHistory]);

  return (
    <AppWrapper>
      <Link to='/'>Back to Index</Link>
      <LogProvider value={ log }>{children}</LogProvider>
      <Log history={ history } />
    </AppWrapper>
  );
};

export default Chrome;
