import React from "react";
import { mount } from "enzyme";
import { ContentState } from "draft-js";
import EditorLink, { EditorLinkProps } from "./editor-link.component";
import Link from "../../../link";
import EditorContext from "../../__internal__/editor.context";

const onLinkAdded = jest.fn();

const Component = ({ text }: { text?: string }) => <div>{text}</div>;

const render = (
  props: EditorLinkProps = { children: [<Component key="key" />] },
  editMode = true
) => {
  return mount(
    <EditorContext.Provider value={{ onLinkAdded, editMode }}>
      <EditorLink {...props} />
    </EditorContext.Provider>
  );
};

describe("EditorLink", () => {
  it("derives the correct url when the valid `contentState` and `entityKey` are provided", () => {
    const contentState = {
      getEntity: (entityKey) => ({ getData: () => entityKey }),
    } as ContentState;

    const wrapper = render(
      {
        contentState,
        entityKey: "bar",
        children: [<Component key="foo" text="foo" />],
      },
      false
    );

    expect(wrapper.find(Link).props().href).toEqual("https://bar");
    expect(wrapper.find(Link).text()).toEqual("foo");
  });

  it("derives the correct url from the `children` element when no `contentState` is provided", () => {
    const wrapper = render(
      {
        entityKey: "bar",
        children: [<Component key="foo" text="foo" />],
      },
      false
    );

    expect(wrapper.find(Link).props().href).toEqual("https://foo");
    expect(wrapper.find(Link).text()).toEqual("foo");
  });

  it("derives the correct url from the `children` element when no `entityKey` is provided", () => {
    const contentState = {
      getEntity: (entityKey) => ({ getData: () => entityKey }),
    } as ContentState;

    const wrapper = render(
      {
        contentState,
        children: [<Component key="foo" text="foo" />],
      },
      false
    );

    expect(wrapper.find(Link).props().href).toEqual("https://foo");
    expect(wrapper.find(Link).text()).toEqual("foo");
  });

  it("does not append `https://` to the url when it contains `http://`", () => {
    const wrapper = render(
      {
        entityKey: "bar",
        children: [<Component key="foo" text="http://foo" />],
      },
      false
    );

    expect(wrapper.find(Link).props().href).toEqual("http://foo");
    expect(wrapper.find(Link).text()).toEqual("http://foo");
  });

  it("calls the `onLinkAdded` callback with the validUrl", () => {
    render({
      entityKey: "bar",
      children: [<Component key="foo" text="http://foo" />],
    });

    expect(onLinkAdded).toHaveBeenCalledWith("http://foo");
  });

  describe("when in editMode", () => {
    it("link should not have a href prop", () => {
      const wrapper = render({
        entityKey: "bar",
        children: [<Component key="foo" text="http://foo" />],
      });

      expect(wrapper.find(Link).props().href).toEqual(undefined);
    });
  });

  describe("when not in editMode", () => {
    it("link should have href prop the same as the link in text", () => {
      const wrapper = render(
        {
          entityKey: "bar",
          children: [<Component key="foo" text="http://foo" />],
        },
        false
      );

      expect(wrapper.find(Link).props().href).toEqual("http://foo");
    });
  });
});
