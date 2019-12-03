import React from 'react';

import styled from 'styled-components';

const Pre = styled.pre`
background-color: #dedede
`;

const Log = ({ history }) => {
  return [...history].reverse().map(entry => <Pre key={ entry.timestamp }>{JSON.stringify(entry, null, 2)}</Pre>);
};

const Context = React.createContext();
export const LogProvider = Context.Provider;
export const LogConsumer = Context.Consumer;

export default Log;
