import React, { memo, useState } from 'react';
import { getThemeName, setThemeName, modernThemes, PARAMS_EVENT } from '.';
import { classicTheme }  from '../../src/style/themes';
import { withTheme } from '@storybook/theming';
import { useChannel } from '@storybook/api';
import {
  IconButton,
  WithTooltip,
  TooltipLinkList,
  Icons
} from '@storybook/components';
import addons, { types } from '@storybook/addons';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import styled from 'styled-components';

addons.register('sage/theme-switcher', api => {
  addons.add('sage/theme-switcher', {
    title: 'theme-switcher',
    type: types.TOOL,
    match: ({ viewMode }) => ['story', 'docs'].includes(viewMode),
    render: () => <ThemeSwitcher api={api} />,
  });
});

const IconButtonWithLabel = styled(IconButton)`
  display: inline-flex;
  alignItems: center;
  cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'} !important;
`;

const IconButtonLabel = withTheme(styled.div`
  font-size: ${({theme}) => theme.typography.size.s2 - 1}px;
  margin-left: 10px;
`);

const ThemeIcon = styled.span`
  height: 1rem;
  width: 1rem;
  display: block;
  background: ${({background}) => background};
`;

export const ThemeSwitcher = memo(withTheme(({ api }) => {
  const [activeTheme, setTheme] = useState(getThemeName());
  const [expanded, setExpanded] = useState(false);
  const [isClassic, setIsClassic] = useState();
  useChannel({
    [PARAMS_EVENT]: ({isClassic}) => {
      setIsClassic(isClassic);
    },
  });

  const themeList = Object.keys(modernThemes).map(themeName => ({
    id: themeName,
    title: themeName,
    onClick: () => {
      setTheme(themeName);
      setThemeName(themeName);
      addons.getChannel().emit(FORCE_RE_RENDER);
    },
    right: <ThemeIcon background={modernThemes[themeName].colors.base}/>
  }));

  const isDocsMode =  api.getUrlState().viewMode === 'docs';
  if(!isDocsMode && isClassic){
    return <IconButtonWithLabel disabled><Icons icon="paintbrush" /><IconButtonLabel>{classicTheme.name}</IconButtonLabel></IconButtonWithLabel>
  }

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltipShown={expanded}
      onVisibilityChange={s => setExpanded(s)}
      tooltip={<TooltipLinkList links={themeList} />}
      closeOnClick
    >
      <IconButtonWithLabel><Icons icon="paintbrush" /><IconButtonLabel>{activeTheme}</IconButtonLabel></IconButtonWithLabel>
    </WithTooltip>
  );
}));