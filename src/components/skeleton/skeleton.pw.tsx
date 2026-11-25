import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import Skeleton from ".";

test("keeps line background geometry aligned when its container resizes", async ({
  mount,
  page,
}) => {
  await mount(
    <div data-role="skeleton-container" style={{ width: "400px" }}>
      <Skeleton
        lines={[
          [
            { height: "40px", shape: "circle" },
            { height: "21px", shape: "rectangle-curved", width: "50%" },
          ],
          { preset: "paragraph", width: "75%" },
        ]}
      />
    </div>,
  );

  const container = page.getByTestId("skeleton-container");
  const skeleton = page.getByRole("status");

  const getGeometry = () =>
    skeleton.evaluate((wrapper) => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const wrapperStyles = getComputedStyle(wrapper);
      const lines = Array.from(
        wrapper.querySelectorAll<HTMLElement>('[data-role="skeleton-line"]'),
      );

      return {
        backgroundWidth: parseFloat(
          wrapperStyles.getPropertyValue("--skeleton-background-width"),
        ),
        wrapperWidth: wrapperRect.width,
        lineOffsets: lines.map((line) => {
          const lineRect = line.getBoundingClientRect();
          const lineStyles = getComputedStyle(line);

          return {
            actualX: parseFloat(
              lineStyles.getPropertyValue("--skeleton-line-offset-x"),
            ),
            actualY: parseFloat(
              lineStyles.getPropertyValue("--skeleton-line-offset-y"),
            ),
            expectedX: lineRect.left - wrapperRect.left,
            expectedY: lineRect.top - wrapperRect.top,
          };
        }),
      };
    });

  const expectAlignedGeometry = async () => {
    const geometry = await getGeometry();

    expect(geometry.backgroundWidth).toBeCloseTo(geometry.wrapperWidth * 3);
    geometry.lineOffsets.forEach(
      ({ actualX, actualY, expectedX, expectedY }) => {
        expect(actualX).toBeCloseTo(expectedX);
        expect(actualY).toBeCloseTo(expectedY);
      },
    );
  };

  await expect
    .poll(async () => (await getGeometry()).backgroundWidth)
    .toBe(1200);
  await expectAlignedGeometry();

  await container.evaluate((element) => {
    element.style.width = "240px";
  });

  await expect
    .poll(async () => (await getGeometry()).backgroundWidth)
    .toBe(720);
  await expectAlignedGeometry();
});
