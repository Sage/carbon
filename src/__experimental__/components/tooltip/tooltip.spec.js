import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { mount } from 'enzyme';
import Tooltip from '.';
import { StyledTooltipInner, StyledTooltipPointer, StyledTooltipWrapper } from './tooltip.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

function render(props, renderer = TestRenderer.create) {
  return renderer(<Tooltip { ...props }>Content</Tooltip>);
}

function renderInner(props) {
  return TestRenderer.create(<StyledTooltipInner { ...props } />).toJSON();
}

function renderPointer(props) {
  return TestRenderer.create(<StyledTooltipPointer { ...props } />).toJSON();
}

function renderWrapper(props) {
  return TestRenderer.create(<StyledTooltipWrapper { ...props } />).toJSON();
}

describe('Tooltip', () => {
  describe('default props', () => {
    it('matches snapshot', () => {
      const wrapper = render({}, mount);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('visible', () => {
    it('matches snapshot', () => {
      const wrapper = render({ isVisible: true }).toJSON();

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('styles', () => {
    describe('TooltipInner', () => {
      it('default', () => {
        assertStyleMatch(
          {
            backgroundColor: '#00141D',
            color: '#FFFFFF',
            display: 'inline-block',
            fontWeight: '700',
            padding: '10px 15px',
            textAlign: 'center',
            maxWidth: '300px',
            wordBreak: 'normal',
            whiteSpace: 'pre-wrap'
          },
          renderInner()
        );
      });

      it('type="error"', () => {
        assertStyleMatch(
          { backgroundColor: '#C7384F' }, renderInner({ type: 'error' })
        );
      });
    });

    describe('TooltipWrapper', () => {
      it('default', () => {
        assertStyleMatch(
          {
            position: 'absolute',
            width: '300px',
            zIndex: '1003'
          },
          renderWrapper(),
        );
      });

      it('position === "bottom"', () => {
        assertStyleMatch(
          { textAlign: 'center' },
          renderWrapper({ position: 'bottom' })
        );
      });

      it('position === "top"', () => {
        assertStyleMatch(
          { textAlign: 'center' },
          renderWrapper({ position: 'top' })
        );
      });

      it('position === "left"', () => {
        assertStyleMatch(
          { textAlign: 'left' },
          renderWrapper({ position: 'left' })
        );
      });

      it('position === "right"', () => {
        assertStyleMatch(
          { textAlign: 'right' },
          renderWrapper({ position: 'right' })
        );
      });

      it('align === "left"', () => {
        assertStyleMatch(
          { textAlign: 'left' },
          renderWrapper({ align: 'left' })
        );
      });

      it('align === "right"', () => {
        assertStyleMatch(
          { textAlign: 'right' },
          renderWrapper({ align: 'right' })
        );
      });
    });

    describe('TooltipPointer', () => {
      const horizontalAlignments = ['left', 'right', 'center'];
      const verticalAlignments = ['top', 'bottom', 'center'];
      const verticalPositions = ['bottom', 'top'];
      const horizontalPositions = ['left', 'right'];

      describe('default', () => {
        it('base', () => {
          assertStyleMatch(
            { position: 'absolute' },
            renderPointer()
          );
        });

        it('&:before', () => {
          assertStyleMatch(
            { position: 'absolute' },
            renderPointer(),
            { modifier: '&:before' }
          );
        });
      });

      describe('position === "bottom"', () => {
        horizontalAlignments.forEach((alignment) => {
          it('base', () => {
            assertStyleMatch(
              { top: '-7.5px' },
              renderPointer({ align: alignment, position: 'bottom' })
            );
          });

          describe('&:before', () => {
            it('default', () => {
              assertStyleMatch(
                {
                  borderTop: 'none',
                  borderRight: '7px solid transparent',
                  borderBottom: '8px solid #00141D',
                  borderLeft: '7px solid transparent',
                  content: '""',
                  height: '0',
                  width: '0'
                },
                renderPointer({ align: alignment, position: 'bottom' }),
                { modifier: '&:before' }
              );
            });

            it('type === "error', () => {
              assertStyleMatch(
                { borderBottomColor: '#C7384F' },
                renderPointer({ align: alignment, position: 'bottom', type: 'error' }),
                { modifier: '&:before' }
              );
            });
          });
        });
      });

      describe('position === "left"', () => {
        verticalAlignments.forEach((alignment) => {
          it('base', () => {
            assertStyleMatch(
              { right: '0px' },
              renderPointer({ align: alignment, position: 'left' })
            );
          });

          describe('&:before', () => {
            it('default', () => {
              assertStyleMatch(
                {
                  borderTop: '7px solid transparent',
                  borderRight: 'none',
                  borderBottom: '7px solid transparent',
                  borderLeft: '8px solid #00141D',
                  content: '""',
                  height: '0',
                  width: '0'
                },
                renderPointer({ align: alignment, position: 'left' }),
                { modifier: '&:before' }
              );
            });

            it('type === "error', () => {
              assertStyleMatch(
                { borderLeftColor: '#C7384F' },
                renderPointer({ align: alignment, position: 'left', type: 'error' }),
                { modifier: '&:before' }
              );
            });
          });
        });
      });

      describe('position === "right"', () => {
        verticalAlignments.forEach((alignment) => {
          it('base', () => {
            assertStyleMatch(
              { left: '-7.5px' },
              renderPointer({ align: alignment, position: 'right' })
            );
          });

          describe('&:before', () => {
            it('default', () => {
              assertStyleMatch(
                {
                  borderTop: '7px solid transparent',
                  borderRight: '8px solid #00141D',
                  borderBottom: '7px solid transparent',
                  borderLeft: 'none',
                  content: '""',
                  height: '0',
                  width: '0'
                },
                renderPointer({ align: alignment, position: 'right' }),
                { modifier: '&:before' }
              );
            });

            it('type === "error', () => {
              assertStyleMatch(
                { borderRightColor: '#C7384F' },
                renderPointer({ align: alignment, position: 'right', type: 'error' }),
                { modifier: '&:before' }
              );
            });
          });
        });
      });

      describe('position === "top"', () => {
        horizontalAlignments.forEach((alignment) => {
          it('base', () => {
            assertStyleMatch(
              { bottom: '0px' },
              renderPointer({ align: alignment, position: 'top' })
            );
          });

          describe('&:before', () => {
            it('default', () => {
              assertStyleMatch(
                {
                  borderTop: '8px solid #00141D',
                  borderRight: '7px solid transparent',
                  borderBottom: 'none',
                  borderLeft: '7px solid transparent',
                  content: '""',
                  height: '0',
                  width: '0'
                },
                renderPointer({ align: alignment, position: 'top' }),
                { modifier: '&:before' }
              );
            });

            it('type === "error', () => {
              assertStyleMatch(
                { borderTopColor: '#C7384F' },
                renderPointer({ align: alignment, position: 'top', type: 'error' }),
                { modifier: '&:before' }
              );
            });
          });
        });
      });

      describe('align === "center"', () => {
        it('vertical positions', () => {
          verticalPositions.forEach((pos) => {
            assertStyleMatch(
              { left: 'calc(50% - 7px)' },
              renderPointer({ align: 'center', position: pos })
            );
          });
        });

        it('horizontal positions', () => {
          horizontalPositions.forEach((pos) => {
            assertStyleMatch(
              { top: 'calc(50% - 7px)' },
              renderPointer({ align: 'center', position: pos })
            );
          });
        });
      });

      describe('align === "left"', () => {
        it('vertical positions', () => {
          verticalPositions.forEach((pos) => {
            assertStyleMatch(
              { left: '10px' },
              renderPointer({ align: 'left', position: pos })
            );
          });
        });
      });

      describe('align === "right"', () => {
        it('vertical positions', () => {
          verticalPositions.forEach((pos) => {
            assertStyleMatch(
              { right: '25px' },
              renderPointer({ align: 'right', position: pos })
            );
          });
        });
      });

      describe('align === "top"', () => {
        it('horizontalPositions', () => {
          horizontalPositions.forEach((pos) => {
            assertStyleMatch(
              { top: '10px' },
              renderPointer({ align: 'top', position: pos })
            );
          });
        });
      });

      describe('align === "bottom"', () => {
        it('horizontalPositions', () => {
          horizontalPositions.forEach((pos) => {
            assertStyleMatch(
              { bottom: '25px' },
              renderPointer({ align: 'bottom', position: pos })
            );
          });
        });
      });
    });
  });
});
