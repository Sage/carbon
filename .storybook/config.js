import React from 'react';
import styled from 'styled-components';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { checkA11y } from '@storybook/addon-a11y';
import { withNotes } from '@storybook/addon-notes';

import { ThemeProvider } from 'styled-components';

const StyledSelect = styled.select`
  height: 50px;
  width: 150px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ComponentContainer = styled.div``;



class AppLayout extends React.Component {
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
    console.log(this.state)

    return (
      <StyledContainer>
        <SelectionContainer>

          <StyledSelect value={this.state.activeTheme} onChange={this.handleSelectChange}>
            <option value='theme1'>theme1</option>
            <option value='theme2'>theme2</option>
          </StyledSelect>
        </SelectionContainer>
        <ComponentContainer>
          <ThemeProvider theme={themes[activeTheme]}>{this.props.children}</ThemeProvider>
        </ComponentContainer>
      </StyledContainer>
    )

  }
}

const req = require.context('../src/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withKnobs);
addDecorator(checkA11y);
addDecorator(withNotes);

// give all stories access to themes
addDecorator(story => <AppLayout>{story()}</AppLayout>);

configure(loadStories, module);