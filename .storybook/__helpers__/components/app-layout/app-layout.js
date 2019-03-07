import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

const StyledSelect = styled.select`
  padding: 5px 15px;
  appearance: none;
  max-width: 150px;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 25px;
`;
const SelectionContainer = styled.div`
  margin: 15px 0;
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
        <div>
          <SelectionContainer>
            <StyledSelect value={ activeTheme } onChange={ this.handleSelectChange }>
              <option value='theme1'>Theme 1</option>
              <option value='theme2'>Theme 2</option>
            </StyledSelect>
          </SelectionContainer>
        </div>

        <div>
          <ThemeProvider theme={ themes[activeTheme] }>{children}</ThemeProvider>
        </div>
      </StyledContainer>
    );
  }
}

export default AppLayout;
