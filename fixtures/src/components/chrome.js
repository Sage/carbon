import React, { useCallback, useState } from 'react';
import Link from 'carbon-react/lib/components/link';
import AppWrapper from 'carbon-react/lib/components/app-wrapper';
import Log, { LogProvider } from './log';

const Chrome = ({ children }) => {
  const [history, setHistory] = useState([]);

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

  return (
    <AppWrapper>
      <Link to='/'>Back to Index</Link>
      <LogProvider value={ log }>{children}</LogProvider>
      <Log history={ history } />
    </AppWrapper>
  );
};

export default Chrome;
