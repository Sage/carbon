import styled, { css } from 'styled-components';
import '../../style/fonts/fonts.css';

const iconSizes = {
  small: '24px',
  medium: '32px',
  large: '40px'
};

const iconBackgroundShapes = {
  square: '0%',
  'rounded-rect': '20%',
  circle: '50%'
};

const iconBackgroundColors = {
  default: '#335c6d',
  error: '#C7384F',
  help: '#FFAB00',
  info: '#1573E6',
  maintenance: '#FF7D00',
  new: '#663399',
  success: '#50B848',
  warning: '#FF7D00'
};

const iconUnicodes = {
  feedback: '\\e930',
  info: '\\e92a',
  help: '\\e951',
  settings: '\\e91a',
  logout: '\\e92e',
  pdf: '\\e91f',
  csv: '\\e94a',
  copy: '\\e91b',
  error: '\\e923',
  calendar: '\\e90e',
  analysis: '\\e912',
  people: '\\e93b',
  dropdown: '\\e910',
  alert: '\\e90b',
  person: '\\e93c',
  search: '\\e92f',
  cross: '\\e91d',
  close: '\\e91e',
  delete: '\\e90c',
  message: '\\e922',
  email: '\\e922',
  edit: '\\e93a',
  print: '\\e942',
  clock: '\\e919',
  euro: '€',
  home: '\\e929',
  cart: '\\e90a',
  bulk_destroy: '\\e90c',
  warning: '\\e924',
  question: '\\e943',
  question_hollow: '\\e95e',
  tick: '\\e950',
  none: '',
  add: '\\e940',
  services: '+',
  collaborate: '\\e946',
  graph: '\\e912',
  plus: '\\e940',
  true_tick: '\\e950',
  arrow: '\\e904',
  old_warning: '\\e924',
  pound: '£',
  settings_old: '\\e91a',
  go: '\\e903',
  question_mark: '\\e943',
  admin: '\\e94f',
  contacts: '\\e93b',
  create: '\\e940',
  piggy_bank: '\\e926',
  entry: '\\e92c',
  edited: '\\e938',
  refresh: '\\e945',
  sync: '\\e944',
  fax: '\\e925',
  shop: '\\e947',
  attach: '\\e937',
  filter: '\\e928',
  chat: '\\e914',
  duplicate: '\\e921',
  call: '\\e93d',
  phone: '\\e93d',
  favourite: '\\e94f',
  favourite_lined: '\\e94e',
  sort_up: '\\e949',
  sort_down: '\\e948',
  link: '\\e92d',
  locked: '\\e935',
  unlocked: '\\e936',
  caret_down: '\\e910',
  draft: '\\e939',
  chart_line: '\\e912',
  chart_bar: '\\e911',
  chart_pie: '\\e913',
  in_progress: '\\e920',
  progressed: '\\e903',
  save: '\\e926',
  image: '\\e93e',
  camera: '\\e90f',
  arrow_up: '\\e907',
  arrow_down: '\\e901',
  arrow_left: '\\e902',
  arrow_right: '\\e904',
  chevron_up: '\\e918',
  chevron_down: '\\e915',
  chevron_left: '\\e916',
  chevron_right: '\\e917',
  download: '\\e900',
  upload: '\\e906',
  uploaded: '\\e905',
  folder: '\\e927',
  share: '\\e946',
  gift: '\\e941',
  mobile: '\\e932',
  grid: '\\e952',
  fit_height: '\\e909',
  fit_width: '\\e908',
  blocked: '\\e933',
  blocked_square: '\\e934',
  drag: '\\e94c',
  drag_vertical: '\\e94d',
  list_view: '\\e92c',
  card_view: '\\e94b',
  minus: '\\e931',
  business: '\\e90d',
  key: '\\e92b',
  credit_card: '\\e91c',
  marker: '\\e93f',
  delivery: '\\e959',
  filter_new: '\\e954',
  view: '\\e957',
  disputed: '\\e958',
  connect: '\\e955',
  chat_notes: '\\e956',
  talk: '\\e95a',
  split: '\\e952',
  disconnect: '\\e953',
  bullet_list: '\\e95b',
  lightbulb_on: '\\e95d',
  lightbulb_off: '\\e95c',
  video: '\\e95e',
  play: '\\e95f',
  ellipsis_horizontal: '\\e960',
  ellipsis_vertical: '\\e961'
};

const StyledIcon = styled.span`
  display: inline-block;
  position: relative;

    ${({ hasShape, bgSize }) => hasShape
      && css`
        align-items: center;
        display: inline-flex;
        justify-content: center;
        height: ${iconSizes[bgSize]};
        width: ${iconSizes[bgSize]};
      `}

    ${({ bgShape }) => bgShape
      && css`
        border-radius: ${iconBackgroundShapes[bgShape]};
      `}

    ${({ bgTheme }) => bgTheme
      && css`
        background-color: ${iconBackgroundColors[bgTheme]};
      `}

    ${({ isFont, type }) => isFont
      && css`
        &::before {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;

          font-family: CarbonIcons;
          content: "${iconUnicodes[type]}";
          font-size: 16px;
          font-style: normal;
          font-weight: normal;
          

          line-height: 16px;
          vertical-align: middle;
        }
    `}
`;

const StyledSvgIcon = styled.span`
  display: inline-block;

  .carbon-icon__svg {
    fill: currentColor;
  }
`;

export { StyledIcon, StyledSvgIcon };
