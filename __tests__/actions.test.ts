import * as actions from "../app/lib/actions";
import "@testing-library/jest-dom";

describe("actions", () => {
  describe("finding days", () => {
    it("finds the 2 total days", async () => {
      const entriesDates = [
        "2026-05-01T20:59:54.458Z",
        "2026-05-02T21:45:28.051Z",
        "2026-05-02T09:37:37.290Z",
      ];
      const days = await actions.FindTotalDaysFromEntries(entriesDates);
      expect(days).toEqual(2);
    });
    it("find 10 total days from entries", async () => {
      const entriesDates = [
        "2026-05-01T20:59:54.458Z",
        "2026-05-05T21:45:28.051Z",
        "2026-05-11T09:37:37.290Z",
      ];

      const days = await actions.FindTotalDaysFromEntries(entriesDates);
      expect(days).toEqual(10);
    });
    it("find 1 day if entries has one value", async () => {
      const entriesDates = ["2026-05-01T20:59:54.458Z"];

      const days = await actions.FindTotalDaysFromEntries(entriesDates);
      expect(days).toEqual(1);
    });
    it("find 1 if entries is empty", async () => {
      const entriesDates: string[] = [];

      const days = await actions.FindTotalDaysFromEntries(entriesDates);
      expect(days).toEqual(1);
    });
  });
});
