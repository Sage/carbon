import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import Pod from '../../../components/pod/pod';

const StyledSelect = styled.select`
  padding: 5px 15px;
  appearance: none;
  max-width: 150px;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SelectionContainer = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

/*
* @class AppLayout
* @constructor
*/
class AppLayout extends React.Component {
  static propTypes = {
    /**
     * A required prop. This is what the app-layout will display.
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node.isRequired
  }

  state = {
    activeTheme: 'theme1',
    themes: {
      theme1: {
        main: 'palevioletred',
        secondary: 'lightblue'
      },
      theme2: {
        main: 'green',
        secondary: 'lightblue'
      }

    }
  }

  handleSelectChange = ({ target }) => this.setState({ activeTheme: target.value })

  render() {
    const { themes, activeTheme } = this.state;
    const { children } = this.props;

    return (
      <StyledContainer>

        <Pod as='secondary'>
          <SelectionContainer>
            <StyledSelect value={ activeTheme } onChange={ this.handleSelectChange }>
              <option value='theme1'>Theme 1</option>
              <option value='theme2'>Theme 2</option>
            </StyledSelect>
          </SelectionContainer>
        </Pod>

        <Pod>
          <ThemeProvider theme={ themes[activeTheme] }>{children}</ThemeProvider>
        </Pod>

      </StyledContainer>
    );
  }
}

export default AppLayout;
