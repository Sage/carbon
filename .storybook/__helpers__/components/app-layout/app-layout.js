import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import small from '../../../../src/style/themes/small';
import medium from '../../../../src/style/themes/medium';
import large from '../../../../src/style/themes/large';
import classic from '../../../../src/style/themes/classic';
import { THEMES } from '../../../../src/style/themes';

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
    activeTheme: THEMES.classic,
    themes: {
      small,
      medium,
      large,
      classic
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
              <option value={ THEMES.classic }>Classic</option>
              <option value={ THEMES.small }>Small</option>
              <option value={ THEMES.medium }>Medium</option>
              <option value={ THEMES.large }>Large</option>
              <option value=''>None</option>
            </StyledSelect>
          </SelectionContainer>
        </div>

        <div>
          { activeTheme ? (<ThemeProvider theme={ themes[activeTheme] }>{children}</ThemeProvider>) : children };
        </div>
      </StyledContainer>
    );
  }
}

export default AppLayout;
