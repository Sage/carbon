import { DeserializeHTML, validateUrl } from "./helpers";

describe("DeserializeHTML", () => {
  it("deserializes HTML into JSON", () => {
    const html = `<p dir="ltr"><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
    const json = DeserializeHTML(html);
    expect(json).toEqual(
      `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is a HTML example.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Look, it has lists!","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"listitem","version":1,"value":1}],"direction":null,"format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`,
    );
  });
});

describe("validateUrl", () => {
  it("returns true when the URL is valid", () => {
    const validUrl = "https://www.example.com";
    expect(validateUrl(validUrl)).toBe(true);
  });

  it("returns false when the URL is invalid", () => {
    const invalidUrl = "example.url";
    expect(validateUrl(invalidUrl)).toBe(false);
  });
});
