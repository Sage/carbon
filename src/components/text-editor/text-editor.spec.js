import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import baseTheme from '../../../style/themes/base';
import TextEditor from './text-editor.component';
import Toolbar from './toolbar.component';
import { StyledEditorStyleControls, StyledEditorActionControls } from './toolbar.style';
import StyledButton from '../../button/button.style';
import Button from '../../button/button.component';
import StyledToolbarButton from './toolbar-button/toolbar-button.style';
import ToolbarButton from './toolbar-button/toolbar-button.component';
import Tooltip from '../../tooltip';

describe('TextEditor', () => {

});
