import guid, { isGuid } from ".";

test("should generate a guid with a length of 36 characters", () => {
  expect(guid().length).toEqual(36);
});

test("should generate a unique guid each time it is called", () => {
  const guids = Array.from({ length: 5 }, () => guid());
  const uniqueGuids = new Set(guids);
  expect(uniqueGuids.size).toEqual(5);
});

describe("isGuid", () => {
  describe("valid GUID strings", () => {
    it("returns true for all zeros GUID", () => {
      expect(isGuid("00000000-0000-0000-0000-000000000000")).toBe(true);
    });

    it("returns true for standard mixed GUID", () => {
      expect(isGuid("123e4567-e89b-12d3-a456-426614174000")).toBe(true);
    });

    it("returns true for mixed case GUID", () => {
      expect(isGuid("A987FBC9-4BED-3078-CF07-9141BA07C9F3")).toBe(true);
    });

    it("returns true for all F's GUID", () => {
      expect(isGuid("ffffffff-ffff-ffff-ffff-ffffffffffff")).toBe(true);
    });
  });

  describe("invalid GUID formats", () => {
    it("returns false for GUID with last segment too short", () => {
      expect(isGuid("00000000-0000-0000-0000-00000000000")).toBe(false);
    });

    it("returns false for GUID with last segment too long", () => {
      expect(isGuid("00000000-0000-0000-0000-0000000000000")).toBe(false);
    });

    it("returns false for GUID with first segment wrong length", () => {
      expect(isGuid("0000000-00000-0000-0000-000000000000")).toBe(false);
    });

    it("returns false for GUID with second segment wrong length", () => {
      expect(isGuid("00000000-000-00000-0000-000000000000")).toBe(false);
    });

    it("returns false for GUID without any separators", () => {
      expect(isGuid("00000000000000000000000000000000")).toBe(false);
    });

    it("returns false for GUID with underscore separators", () => {
      expect(isGuid("00000000_0000_0000_0000_000000000000")).toBe(false);
    });

    it("returns false for GUID with non-hexadecimal characters", () => {
      expect(isGuid("GGGGGGGG-GGGG-GGGG-GGGG-GGGGGGGGGGGG")).toBe(false);
    });

    it("returns false for GUID with one non-hexadecimal character", () => {
      expect(isGuid("00000000-0000-0000-0000-00000000000g")).toBe(false);
    });
  });

  describe("non-string inputs", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const guidTest = (props: any) => {
      return isGuid(props);
    };

    it("returns false for null input", () => {
      expect(guidTest(null)).toBe(false);
    });

    it("returns false for undefined input", () => {
      expect(guidTest(undefined)).toBe(false);
    });

    it("returns false for number input", () => {
      expect(guidTest(123)).toBe(false);
    });

    it("returns false for object input", () => {
      expect(guidTest({})).toBe(false);
    });

    it("returns false for array input", () => {
      expect(guidTest([])).toBe(false);
    });

    it("returns false for boolean input", () => {
      expect(guidTest(true)).toBe(false);
    });
  });

  describe("empty strings", () => {
    it("returns false for empty string", () => {
      expect(isGuid("")).toBe(false);
    });

    it("returns false for whitespace string", () => {
      expect(isGuid(" ")).toBe(false);
    });
  });
});
