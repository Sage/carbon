import { act } from "react-dom/test-utils";
import StyledMenuItemWrapper from "../../menu-item/menu-item.style";
import { StyledSubmenuWrapper } from "../submenu/submenu.style";

const events = {
  space: {
    key: " ",
    preventDefault: jest.fn(),
  },
};

const openSubmenu = (wrapper, index = 0) => {
  const menuWrapper = wrapper.find(StyledSubmenuWrapper).at(index);

  const menuItem = menuWrapper.exists("a")
    ? menuWrapper.find("a")
    : menuWrapper.find("button");

  menuItem.getDOMNode().focus();

  act(() => {
    menuWrapper.find(StyledMenuItemWrapper).props().onKeyDown(events.space);
  });

  wrapper.update();
};

export default openSubmenu;
