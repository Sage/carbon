import AutoFocus from "./auto-focus";
import guid from "../guid";

describe("AutoFocus", () => {
  describe("based on previous", () => {
    let previous;

    beforeEach(() => {
      previous = {
        key: "0",
        autoFocus: true,
      };
    });

    describe("getKey", () => {
      it("returns new key if autoFocus prop changed", () => {
        expect(AutoFocus.getKey(false)).not.toEqual(previous.key);
        expect(AutoFocus.getKey(false, previous)).not.toEqual(previous.key);
      });

      it("returns old key if autoFocus prop did not change", () => {
        expect(AutoFocus.getKey(true, previous)).toEqual(previous.key);
      });
    });
  });
});
