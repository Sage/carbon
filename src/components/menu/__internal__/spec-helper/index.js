import { act } from "react-dom/test-utils";
import StyledMenuItemWrapper from "../../menu-item/menu-item.style";

const events = {
  space: {
    key: "Space",
    which: 32,
    preventDefault: jest.fn(),
  },
};

const openSubmenu = (wrapper) => {
  const menuItem = wrapper.find('[data-component="submenu-wrapper"]').find("a");

  menuItem.getDOMNode().focus();

  act(() => {
    wrapper.find(StyledMenuItemWrapper).at(0).props().onKeyDown(events.space);
  });

  wrapper.update();
};

export default openSubmenu;
