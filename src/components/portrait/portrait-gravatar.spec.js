import React from "react";
import MD5 from "crypto-js/md5";
import { mount } from "enzyme";
import PortraitGravatar from "./portrait-gravatar.component";
import { StyledPortraitGravatar } from "./portrait.style";

describe("PortraitGravatar", () => {
  describe("gravatarSrc", () => {
    it("returns the correct Gravatar URL", () => {
      const email = "example@example.com";
      const rendered = mount(
        <PortraitGravatar gravatarEmail={email} size="ML" />
      );
      const base = "https://www.gravatar.com/avatar/";
      const hash = MD5(email);
      const dimensions = 56;
      expect(rendered.find(StyledPortraitGravatar).props().src).toEqual(
        `${base}${hash}?s=${dimensions}&d=404`
      );
    });
  });
});
