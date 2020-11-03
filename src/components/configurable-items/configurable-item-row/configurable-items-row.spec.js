import React from "react";
import { shallow, mount } from "enzyme";
import { ConfigurableItemRowWithoutHOC } from "./configurable-item-row.component";
import { Checkbox } from "../../../__experimental__/components/checkbox";
import Icon from "../../icon";
import { WithDrag, WithDrop } from "../../drag-and-drop";
import DraggableContext from "../../drag-and-drop/draggable-context";
import { rootTagTest } from "../../../utils/helpers/tags/tags-specs";
import {
  ConfigurableItemRowStyle,
  ConfigurableItemRowIconStyle,
} from "./configurable-item-row.style";
import { aegeanTheme, mintTheme, baseTheme } from "../../../style/themes";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";

describe("ConfigurableItemRow", () => {
  let wrapper;
  const onChange = () => {};

  describe("classNames", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItemRowWithoutHOC
          className="my-custom-class-name"
          rowIndex={1}
        />
      );
      wrapper.instance().context = { dragAndDropActiveIndex: 1 };
    });

    it("adds the className to the row", () => {
      expect(wrapper.find(".my-custom-class-name").length).toEqual(1);
    });

    describe("when the dragAndDropActiveIndex is the same as the rowIndex", () => {
      beforeEach(() => {
        wrapper.setProps({ rowIndex: 1 });
      });

      it("adds configurable-item-row--dragged to the classes", () => {
        expect(
          wrapper.find(ConfigurableItemRowStyle).prop("isDragged")
        ).toEqual(true);
      });
    });

    describe("when the dragAndDropActiveIndex is the same as the rowIndex", () => {
      beforeEach(() => {
        wrapper.setProps({ rowIndex: 2 });
      });
      it("does not add configurable-item-row--dragged to the classes", () => {
        expect(
          wrapper.find(ConfigurableItemRowStyle).prop("isDragged")
        ).toEqual(false);
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableItemRowWithoutHOC
            data-element="bar"
            data-role="baz"
            rowIndex={1}
          />
        );
      });
      it("includes the correct component, element and role data tags", () => {
        rootTagTest(wrapper, "configurable-item-row", "bar", "baz");
      });
    });
  });

  describe("onChange", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItemRowWithoutHOC onChange={onChange} rowIndex={1} />
      );
    });
    it("passes the onChange prop through to the Checkbox onChange prop", () => {
      expect(wrapper.find(Checkbox).props().onChange).toEqual(onChange);
    });
  });

  describe("enabled", () => {
    describe("when the row is enabled", () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableItemRowWithoutHOC enabled rowIndex={1} />
        );
      });

      it("sets the Checkbox value to true", () => {
        expect(wrapper.find(Checkbox).props().checked).toBe(true);
      });
    });

    describe("when the row is not enabled", () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableItemRowWithoutHOC enabled={false} rowIndex={1} />
        );
      });

      it("sets the Checkbox value to false", () => {
        expect(wrapper.find(Checkbox).props().checked).toBe(false);
      });
    });
  });

  describe("locked", () => {
    describe("when the row is locked", () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableItemRowWithoutHOC locked rowIndex={1} />
        );
      });

      it("sets the Checkbox as disabled", () => {
        expect(wrapper.find(Checkbox).props().disabled).toBeTruthy();
      });
    });

    describe("when the row is not locked", () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableItemRowWithoutHOC locked={false} rowIndex={1} />
        );
      });

      it("does not set the Checkbox as disabled", () => {
        expect(wrapper.find(Checkbox).props().disabled).toBeFalsy();
      });
    });
  });

  describe("name", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItemRowWithoutHOC name="Foo" rowIndex={1} />
      );
    });

    it("sets the Checkbox label prop", () => {
      expect(wrapper.find(Checkbox).props().label).toEqual("Foo");
    });
  });

  describe("rowIndex", () => {
    beforeEach(() => {
      wrapper = shallow(<ConfigurableItemRowWithoutHOC rowIndex={2} />);
    });
    it("sets the index prop on the WithDrop component", () => {
      expect(wrapper.find(WithDrop).props().index).toEqual(2);
    });
  });

  describe("icon", () => {
    beforeEach(() => {
      wrapper = mount(
        <DraggableContext onDrag={() => {}}>
          <ConfigurableItemRowWithoutHOC name="Foo" rowIndex={1} />
        </DraggableContext>
      );
    });

    it("renders a drag vertical icon wrapped in WithDrag", () => {
      wrapper.update(); // this is required because the _draggableNode ref is initially undefined.
      const withDrag = wrapper.find(WithDrag);
      const row = wrapper.find(ConfigurableItemRowWithoutHOC);
      expect(withDrag.length).toEqual(1);
      expect(withDrag.find(Icon).props().type).toEqual("drag_vertical");
      expect(withDrag.props().draggableNode()).toEqual(
        row.instance()._listItem
      );
    });
  });

  describe("list item markup", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItemRowWithoutHOC name="Foo" rowIndex={1} />
      );
    });

    it("renders an <li> wrapped in WithDrop", () => {
      const withDrop = wrapper.find(WithDrop);
      expect(withDrop.length).toEqual(1);
      expect(
        withDrop.find('[data-element="configurable-item-row"]').length
      ).toEqual(1);
    });
  });
});

describe.each([
  ["base", baseTheme],
  ["mint", mintTheme],
  ["aegean", aegeanTheme],
])("when %s theme is provided to the component", (name, theme) => {
  describe("ConfigurableItemRowStyle", () => {
    it("should render correct styles", () => {
      assertStyleMatch(
        {
          borderBottom: `1px solid ${theme.disabled.input}`,
          padding: "5px 0.5em 5px 0px",
        },
        mount(<ConfigurableItemRowStyle theme={theme} />)
      );
    });

    it("should render correct isDragged styles", () => {
      assertStyleMatch(
        {
          cursor: "-webkit-grabbing",
        },
        mount(<ConfigurableItemRowStyle theme={theme} isDragged />)
      );
    });

    it("should render correct isDragging styles", () => {
      assertStyleMatch(
        {
          cursor: "-webkit-grabbing",
        },
        mount(<ConfigurableItemRowStyle theme={theme} isDragging />)
      );
    });
  });

  describe("ConfigurableItemRowIconStyle", () => {
    it("should render correct styles", () => {
      assertStyleMatch(
        {
          paddingRight: "12px",
        },
        mount(
          <ConfigurableItemRowIconStyle type="drag_vertical" theme={theme} />
        )
      );
    });
  });
});
