import React, { useState } from "react";
import styled from "styled-components";

import TokensWrapper, {
  type Colors,
  type BrandOverrides,
  type FocusColors,
} from "../../";
import Button from "../../../button/__next__";
import Link from "../../../link";
import Box from "../../../box";

const Container = styled.main`
  display: flex;
  height: 100vh;
  gap: 0;
`;

const Sidebar = styled.div<{ $isDarkMode: boolean }>`
  width: 340px;
  background: ${({ $isDarkMode }) => ($isDarkMode ? "#2a2a2a" : "white")};
  border-right: 1px solid
    ${({ $isDarkMode }) => ($isDarkMode ? "#4a4a4a" : "#e0e0e0")};
  padding: 24px;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 24px;
    color: ${({ $isDarkMode }) => ($isDarkMode ? "#f5f5f5" : "#161616")};
  }
`;

const Label = styled.label<{ $isDarkMode: boolean }>`
  display: block;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${({ $isDarkMode }) => ($isDarkMode ? "#d0d0d0" : "#525252")};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ColorGroup = styled.div`
  margin-bottom: 28px;
`;

const Input = styled.input<{ $isDarkMode: boolean }>`
  &[type="color"] {
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  &[type="text"] {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid
      ${({ $isDarkMode }) => ($isDarkMode ? "#5a5a5a" : "#e0e0e0")};
    background: ${({ $isDarkMode }) => ($isDarkMode ? "#1f1f1f" : "white")};
    border-radius: 4px;
    font-size: 12px;
    font-family: "Monaco", "Courier New", monospace;
    text-transform: uppercase;
    color: ${({ $isDarkMode }) => ($isDarkMode ? "#f5f5f5" : "#161616")};
  }
`;

const ColorInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`;

const PreviewArea = styled.div<{ $isDarkMode: boolean }>`
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  background: ${({ $isDarkMode }) =>
    $isDarkMode
      ? "linear-gradient(135deg, #202020 0%, #2b2b2b 100%)"
      : "linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)"};
`;

const PreviewHeader = styled.div<{ $isDarkMode: boolean }>`
  margin-bottom: 40px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: ${({ $isDarkMode }) => ($isDarkMode ? "#f5f5f5" : "#161616")};
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: ${({ $isDarkMode }) => ($isDarkMode ? "#c2c2c2" : "#8d8d8d")};
  }
`;

const ComponentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 24px;
`;

const ComponentCard = styled(Box)<{ $isDarkMode: boolean }>`
  background: ${({ $isDarkMode }) => ($isDarkMode ? "#303030" : "white")};
  border-radius: 8px;
  padding: 24px;
  border: 1px solid
    ${({ $isDarkMode }) => ($isDarkMode ? "#4a4a4a" : "#e0e0e0")};

  h3 {
    font-size: 12px;
    font-weight: 600;
    color: ${({ $isDarkMode }) => ($isDarkMode ? "#e0e0e0" : "#525252")};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 16px;
  }
`;

const ComponentRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ResetButton = styled.button<{ $isDarkMode: boolean }>`
  width: 100%;
  padding: 10px 16px;
  background: ${({ $isDarkMode }) => ($isDarkMode ? "#3a3a3a" : "#f5f5f5")};
  border: 1px solid
    ${({ $isDarkMode }) => ($isDarkMode ? "#5a5a5a" : "#e0e0e0")};
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ $isDarkMode }) => ($isDarkMode ? "#f5f5f5" : "#161616")};
  cursor: pointer;
  margin-top: 24px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $isDarkMode }) => ($isDarkMode ? "#474747" : "#e8e8e8")};
  }
`;

const SwatchBox = styled.div`
  padding: 16px;
  border-radius: 4px;
  font-weight: 600;
  flex: 1;
`;

const InversePanel = styled.div<{ $isDarkMode: boolean }>`
  background: ${({ $isDarkMode }) => ($isDarkMode ? "#f5f5f5" : "#1f1f1f")};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface PreviewProps {
  modeOverride?: "light" | "dark";
  isWhiteLabel?: boolean;
  isChromatic?: boolean;
}

const initialLightOverrides: Colors = {
  primaryBrand: "#0043ce",
  primaryBrandHover: "#0039b8",
  primaryBrandActive: "#002aa8",
  onPrimaryBrand: "#ffffff",
  onPrimaryBrandActive: "#ffffff",
  onPrimaryBrandHover: "#ffffff",
};

const initialLightInverseOverrides: Colors = {
  primaryBrand: "#9eea00",
  primaryBrandHover: "#b8f255",
  primaryBrandActive: "#85c700",
  onPrimaryBrand: "#161616",
  onPrimaryBrandActive: "#161616",
  onPrimaryBrandHover: "#161616",
};

const initialDarkOverrides: Colors = {
  primaryBrand: "#4589ff",
  primaryBrandHover: "#66b3ff",
  primaryBrandActive: "#82c5ff",
  onPrimaryBrand: "#161616",
  onPrimaryBrandActive: "#161616",
  onPrimaryBrandHover: "#161616",
};

const initialDarkInverseOverrides: Colors = {
  primaryBrand: "#2f7d32",
  primaryBrandHover: "#1e6f2c",
  primaryBrandActive: "#246428",
  onPrimaryBrand: "#ffffff",
  onPrimaryBrandActive: "#ffffff",
  onPrimaryBrandHover: "#ffffff",
};

const initialFocusOverrides: FocusColors = {
  inner: "#69ffa3",
  outer: "#8069ff",
  alt: "#ff69b4",
};

const initialFocusInverseOverrides: FocusColors = {
  inner: "#69ffa3",
  outer: "#8069ff",
  alt: "#ff69b4",
};

const initialFontOverrides: BrandOverrides["font"] = {
  family: {
    heading: "Helvetica Neue, sans-serif",
    subheading: "Helvetica Neue, sans-serif",
    body: "Helvetica Neue, sans-serif",
    component: "Helvetica Neue, sans-serif",
    other: "Helvetica Neue, sans-serif",
  },
};

const initialBorderRadiusScale: BrandOverrides["borderRadiusScale"] = "0.5";

const Preview: React.FC<PreviewProps> = ({
  modeOverride = "light",
  isWhiteLabel = false,
  isChromatic = false,
}) => {
  const isDarkMode = modeOverride === "dark";
  const [lightOverrides, setLightOverrides] = useState<Colors>(
    initialLightOverrides,
  );
  const [lightInverseOverrides, setLightInverseOverrides] = useState<Colors>(
    initialLightInverseOverrides,
  );
  const [darkOverrides, setDarkOverrides] =
    useState<Colors>(initialDarkOverrides);
  const [darkInverseOverrides, setDarkInverseOverrides] = useState<Colors>(
    initialDarkInverseOverrides,
  );
  const [focusOverrides, setFocusOverrides] = useState<FocusColors>(
    initialFocusOverrides,
  );
  const [focusInverseOverrides, setFocusInverseOverrides] =
    useState<FocusColors>(initialFocusInverseOverrides);
  const [fontOverrides, setFontOverrides] =
    useState<BrandOverrides["font"]>(initialFontOverrides);
  const [borderRadiusScale, setBorderRadiusScale] = useState<
    BrandOverrides["borderRadiusScale"]
  >(initialBorderRadiusScale);

  const resetColors = () => {
    setLightOverrides(initialLightOverrides);
    setLightInverseOverrides(initialLightInverseOverrides);
    setDarkOverrides(initialDarkOverrides);
    setDarkInverseOverrides(initialDarkInverseOverrides);
    setFocusOverrides(initialFocusOverrides);
    setFocusInverseOverrides(initialFocusInverseOverrides);
  };

  const resetFontOverrides = () => {
    setFontOverrides(initialFontOverrides);
  };

  const resetBorderRadiusScale = () => {
    setBorderRadiusScale(initialBorderRadiusScale);
  };

  const renderColorInput = <T extends Colors | FocusColors>(
    label: string,
    key: keyof Colors | keyof FocusColors,
    value: string,
    setter: React.Dispatch<React.SetStateAction<T>>,
  ) => (
    <ColorGroup>
      <Label $isDarkMode={isDarkMode} id={label.replace(/\s+/g, "")}>
        {label}
      </Label>
      <ColorInputWrapper>
        <Input
          aria-labelledby={label.replace(/\s+/g, "")}
          type="color"
          $isDarkMode={isDarkMode}
          value={value}
          onChange={(e) =>
            setter((prev) => ({
              ...prev,
              [key]: e.target.value,
            }))
          }
        />
        <Input
          aria-labelledby={label.replace(/\s+/g, "")}
          $isDarkMode={isDarkMode}
          type="text"
          value={value}
          onChange={(e) =>
            setter((prev) => ({
              ...prev,
              [key]: e.target.value,
            }))
          }
          placeholder="#000000"
        />
      </ColorInputWrapper>
    </ColorGroup>
  );

  return (
    <TokensWrapper
      modeSupportOptIn
      modeOverride={modeOverride}
      overrides={
        isWhiteLabel
          ? {
              light: { ...lightOverrides, inverse: lightInverseOverrides },
              dark: { ...darkOverrides, inverse: darkInverseOverrides },
              focus: { ...focusOverrides, inverse: focusInverseOverrides },
              font: fontOverrides,
              borderRadiusScale: borderRadiusScale,
            }
          : undefined
      }
    >
      <Container>
        {/* Sidebar */}
        {isWhiteLabel && !isChromatic && (
          <Sidebar $isDarkMode={isDarkMode}>
            <h2>Brand Colors</h2>

            {!isDarkMode && (
              <>
                <h3
                  style={{
                    fontSize: "13px",
                    marginBottom: "12px",
                    color: isDarkMode ? "#f5f5f5" : "#161616",
                  }}
                >
                  Light Mode
                </h3>
                {renderColorInput(
                  "Primary",
                  "primaryBrand",
                  lightOverrides.primaryBrand,
                  setLightOverrides,
                )}
                {renderColorInput(
                  "Primary Hover",
                  "primaryBrandHover",
                  lightOverrides.primaryBrandHover || "",
                  setLightOverrides,
                )}
                {renderColorInput(
                  "Primary Active",
                  "primaryBrandActive",
                  lightOverrides.primaryBrandActive || "",
                  setLightOverrides,
                )}
                {renderColorInput(
                  "Text on Primary",
                  "onPrimaryBrand",
                  lightOverrides.onPrimaryBrand || "",
                  setLightOverrides,
                )}
                {renderColorInput(
                  "Text on Primary Hover",
                  "onPrimaryBrandHover",
                  lightOverrides.onPrimaryBrandHover || "",
                  setLightOverrides,
                )}
                {renderColorInput(
                  "Text on Primary Active",
                  "onPrimaryBrandActive",
                  lightOverrides.onPrimaryBrandActive || "",
                  setLightOverrides,
                )}

                <h3
                  style={{
                    fontSize: "13px",
                    marginBottom: "12px",
                    marginTop: "20px",
                    color: isDarkMode ? "#f5f5f5" : "#161616",
                  }}
                >
                  Light Mode Inverse
                </h3>
                {renderColorInput(
                  "Primary Inverse",
                  "primaryBrand",
                  lightInverseOverrides.primaryBrand || "",
                  setLightInverseOverrides,
                )}
                {renderColorInput(
                  "Primary Hover Inverse",
                  "primaryBrandHover",
                  lightInverseOverrides.primaryBrandHover || "",
                  setLightInverseOverrides,
                )}
                {renderColorInput(
                  "Primary Active Inverse",
                  "primaryBrandActive",
                  lightInverseOverrides.primaryBrandActive || "",
                  setLightInverseOverrides,
                )}
                {renderColorInput(
                  "Text on Primary Inverse",
                  "onPrimaryBrand",
                  lightInverseOverrides.onPrimaryBrand || "",
                  setLightInverseOverrides,
                )}
                {renderColorInput(
                  "Text on Primary Hover Inverse",
                  "onPrimaryBrandHover",
                  lightInverseOverrides.onPrimaryBrandHover || "",
                  setLightInverseOverrides,
                )}
                {renderColorInput(
                  "Text on Primary Active Inverse",
                  "onPrimaryBrandActive",
                  lightInverseOverrides.onPrimaryBrandActive || "",
                  setLightInverseOverrides,
                )}
              </>
            )}
            {isDarkMode && (
              <>
                <h3
                  style={{
                    fontSize: "13px",
                    marginBottom: "12px",
                    marginTop: "28px",
                    color: isDarkMode ? "#f5f5f5" : "#161616",
                  }}
                >
                  Dark Mode
                </h3>
                {renderColorInput(
                  "Primary",
                  "primaryBrand",
                  darkOverrides.primaryBrand,
                  setDarkOverrides,
                )}
                {renderColorInput(
                  "Primary Hover",
                  "primaryBrandHover",
                  darkOverrides.primaryBrandHover || "",
                  setDarkOverrides,
                )}
                {renderColorInput(
                  "Primary Active",
                  "primaryBrandActive",
                  darkOverrides.primaryBrandActive || "",
                  setDarkOverrides,
                )}
                {renderColorInput(
                  "Text on Primary",
                  "onPrimaryBrand",
                  darkOverrides.onPrimaryBrand || "",
                  setDarkOverrides,
                )}
                {renderColorInput(
                  "Text on Primary Hover",
                  "onPrimaryBrandHover",
                  darkOverrides.onPrimaryBrandHover || "",
                  setDarkOverrides,
                )}
                {renderColorInput(
                  "Text on Primary Active",
                  "onPrimaryBrandActive",
                  darkOverrides.onPrimaryBrandActive || "",
                  setDarkOverrides,
                )}

                <h3
                  style={{
                    fontSize: "13px",
                    marginBottom: "12px",
                    marginTop: "20px",
                    color: isDarkMode ? "#f5f5f5" : "#161616",
                  }}
                >
                  Dark Mode Inverse
                </h3>
                {renderColorInput(
                  "Primary Inverse",
                  "primaryBrand",
                  darkInverseOverrides.primaryBrand || "",
                  setDarkInverseOverrides,
                )}
                {renderColorInput(
                  "Primary Hover Inverse",
                  "primaryBrandHover",
                  darkInverseOverrides.primaryBrandHover || "",
                  setDarkInverseOverrides,
                )}
                {renderColorInput(
                  "Primary Active Inverse",
                  "primaryBrandActive",
                  darkInverseOverrides.primaryBrandActive || "",
                  setDarkInverseOverrides,
                )}
                {renderColorInput(
                  "Text on Primary Inverse",
                  "onPrimaryBrand",
                  darkInverseOverrides.onPrimaryBrand || "",
                  setDarkInverseOverrides,
                )}
                {renderColorInput(
                  "Text on Primary Hover Inverse",
                  "onPrimaryBrandHover",
                  darkInverseOverrides.onPrimaryBrandHover || "",
                  setDarkInverseOverrides,
                )}
                {renderColorInput(
                  "Text on Primary Active Inverse",
                  "onPrimaryBrandActive",
                  darkInverseOverrides.onPrimaryBrandActive || "",
                  setDarkInverseOverrides,
                )}
              </>
            )}

            <h3
              style={{
                fontSize: "13px",
                marginBottom: "12px",
                marginTop: "20px",
                color: isDarkMode ? "#f5f5f5" : "#161616",
              }}
            >
              Focus Colors
            </h3>
            {renderColorInput(
              "Focus Inner",
              "inner",
              focusOverrides.inner || "",
              setFocusOverrides,
            )}
            {renderColorInput(
              "Focus Outer",
              "outer",
              focusOverrides.outer || "",
              setFocusOverrides,
            )}
            {renderColorInput(
              "Focus Alt",
              "alt",
              focusOverrides.alt || "",
              setFocusOverrides,
            )}

            <h3
              style={{
                fontSize: "13px",
                marginBottom: "12px",
                marginTop: "20px",
                color: isDarkMode ? "#f5f5f5" : "#161616",
              }}
            >
              Focus Colors Inverse
            </h3>
            {renderColorInput(
              "Focus Inner Inverse",
              "inner",
              focusInverseOverrides.inner || "",
              setFocusInverseOverrides,
            )}
            {renderColorInput(
              "Focus Outer Inverse",
              "outer",
              focusInverseOverrides.outer || "",
              setFocusInverseOverrides,
            )}
            {renderColorInput(
              "Focus Alt Inverse",
              "alt",
              focusInverseOverrides.alt || "",
              setFocusInverseOverrides,
            )}

            <h2>Font Family</h2>
            <div style={{ marginBottom: "16px" }}>
              <Label $isDarkMode={isDarkMode} htmlFor="heading">
                Heading
              </Label>
              <Input
                $isDarkMode={isDarkMode}
                id="heading"
                type="text"
                value={fontOverrides?.family?.heading || ""}
                onChange={(e) =>
                  setFontOverrides((prev) => ({
                    family: {
                      ...prev?.family,
                      heading: e.target.value,
                    },
                  }))
                }
                placeholder="Arial, sans-serif"
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <Label $isDarkMode={isDarkMode} htmlFor="subheading">
                Subheading
              </Label>
              <Input
                $isDarkMode={isDarkMode}
                id="subheading"
                type="text"
                value={fontOverrides?.family?.subheading || ""}
                onChange={(e) =>
                  setFontOverrides((prev) => ({
                    family: {
                      ...prev?.family,
                      subheading: e.target.value,
                    },
                  }))
                }
                placeholder="Verdana, sans-serif"
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <Label $isDarkMode={isDarkMode} htmlFor="body">
                Body
              </Label>
              <Input
                $isDarkMode={isDarkMode}
                id="body"
                type="text"
                value={fontOverrides?.family?.body || ""}
                onChange={(e) =>
                  setFontOverrides((prev) => ({
                    family: {
                      ...prev?.family,
                      body: e.target.value,
                    },
                  }))
                }
                placeholder="Tahoma, sans-serif"
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <Label $isDarkMode={isDarkMode} htmlFor="component">
                Component
              </Label>
              <Input
                $isDarkMode={isDarkMode}
                id="component"
                type="text"
                value={fontOverrides?.family?.component || ""}
                onChange={(e) =>
                  setFontOverrides((prev) => ({
                    family: {
                      ...prev?.family,
                      component: e.target.value,
                    },
                  }))
                }
                placeholder="Courier New, monospace"
              />
            </div>

            <h2 id="border-scale">Border Radius Scale</h2>
            <div style={{ marginBottom: "16px" }}>
              <Input
                aria-labelledby="border-scale"
                $isDarkMode={isDarkMode}
                id="borderRadiusScale"
                type="text"
                value={borderRadiusScale || ""}
                onChange={(e) => setBorderRadiusScale(e.target.value)}
                placeholder="0.5"
              />
            </div>

            <ResetButton
              $isDarkMode={isDarkMode}
              onClick={() => {
                resetColors();
                resetFontOverrides();
                resetBorderRadiusScale();
              }}
            >
              Reset to initial values
            </ResetButton>
          </Sidebar>
        )}
        {/* Main Preview */}
        <PreviewArea $isDarkMode={isDarkMode}>
          <PreviewHeader $isDarkMode={isDarkMode}>
            <h2 style={{ font: "var(--global-font-static-heading-m)" }}>
              Live Component Preview
            </h2>
            {isWhiteLabel && !isChromatic && (
              <h3
                style={{
                  color: isDarkMode ? "#ffffff" : "#000000",
                  font: "var(--global-font-static-subheading-m)",
                }}
              >
                Only components that currently react to brand token overrides
              </h3>
            )}
          </PreviewHeader>

          <ComponentsGrid>
            {/* Next Buttons */}
            <ComponentCard $isDarkMode={isDarkMode}>
              <h4
                style={{
                  font: "var(--global-font-static-body-medium-m)",
                  color: isDarkMode ? "#ffffff" : "#000000",
                }}
              >
                Buttons (Next)
              </h4>
              <ComponentRow>
                <Button variant="default" variantType="primary">
                  Primary Button
                </Button>
                <Button variant="default" variantType="secondary">
                  Secondary
                </Button>
              </ComponentRow>
              <ComponentRow>
                <Button variant="destructive" variantType="primary">
                  Delete
                </Button>
                <Button variant="default" variantType="primary" disabled>
                  Disabled
                </Button>
              </ComponentRow>
              <ComponentRow>
                <Button variant="default" variantType="tertiary">
                  Tertiary
                </Button>
                <Button variant="default" variantType="subtle">
                  Subtle
                </Button>
              </ComponentRow>
            </ComponentCard>

            {/* Next Buttons Inverse */}
            <ComponentCard $isDarkMode={isDarkMode}>
              <h4
                style={{
                  font: "var(--global-font-static-body-medium-m)",
                  color: isDarkMode ? "#ffffff" : "#000000",
                }}
              >
                Buttons (Inverse)
              </h4>
              <InversePanel $isDarkMode={isDarkMode}>
                <ComponentRow>
                  <Button variant="default" variantType="primary" inverse>
                    Primary Inverse
                  </Button>
                  <Button variant="default" variantType="secondary" inverse>
                    Secondary Inverse
                  </Button>
                </ComponentRow>
                <ComponentRow>
                  <Button variant="default" variantType="tertiary" inverse>
                    Tertiary Inverse
                  </Button>
                  <Button variant="default" variantType="subtle" inverse>
                    Subtle Inverse
                  </Button>
                </ComponentRow>
              </InversePanel>
            </ComponentCard>

            {/* Links */}
            <ComponentCard $isDarkMode={isDarkMode}>
              <h4
                style={{
                  font: "var(--global-font-static-body-medium-m)",
                  color: isDarkMode ? "#ffffff" : "#000000",
                }}
              >
                Links
              </h4>
              <ComponentRow>
                <Link href="#" variant="typical">
                  Typical Link
                </Link>
                <Link href="#" variant="subtle">
                  Subtle Link
                </Link>
                <Link href="#" variant="negative">
                  Negative Link
                </Link>
              </ComponentRow>
              <ComponentRow>
                <Link href="#" variant="typical" bold>
                  Bold Link
                </Link>
                <Link href="#" variant="typical" linkSize="large">
                  Large Link
                </Link>
              </ComponentRow>
            </ComponentCard>

            {/* Links Inverse */}
            <ComponentCard $isDarkMode={isDarkMode}>
              <h4
                style={{
                  font: "var(--global-font-static-body-medium-m)",
                  color: isDarkMode ? "#ffffff" : "#000000",
                }}
              >
                Links (Inverse)
              </h4>
              <InversePanel $isDarkMode={isDarkMode}>
                <ComponentRow>
                  <Link href="#" variant="typical" inverse>
                    Typical Inverse
                  </Link>
                  <Link href="#" variant="subtle" inverse>
                    Subtle Inverse
                  </Link>
                  <Link href="#" variant="negative" inverse>
                    Negative Inverse
                  </Link>
                </ComponentRow>
              </InversePanel>
            </ComponentCard>

            {/* Token Swatches */}
            {isWhiteLabel && (
              <ComponentCard $isDarkMode={isDarkMode}>
                <h4
                  style={{
                    font: "var(--global-font-static-body-medium-m)",
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }}
                >
                  Brand Token Swatches
                </h4>
                <ComponentRow>
                  <SwatchBox
                    style={{
                      backgroundColor: "var(--mode-color-action-main-default)",
                      color: "var(--mode-color-action-main-with-default)",
                      font: "700 14px/1.5 var(--global-font-families-component)",
                    }}
                  >
                    Primary
                  </SwatchBox>
                </ComponentRow>
                <ComponentRow>
                  <SwatchBox
                    style={{
                      backgroundColor: "var(--mode-color-action-main-hover)",
                      color: "var(--mode-color-action-main-with-default)",
                      font: "500 14px/1.5 var(--global-font-families-component)",
                    }}
                  >
                    Hover State
                  </SwatchBox>
                </ComponentRow>
                <ComponentRow>
                  <SwatchBox
                    style={{
                      backgroundColor: "var(--mode-color-action-main-active)",
                      color: "var(--mode-color-action-main-with-default)",
                    }}
                  >
                    Active State
                  </SwatchBox>
                </ComponentRow>
                <ComponentRow>
                  <SwatchBox
                    style={{
                      boxShadow: "var(--focus-shadow-default)",
                      backgroundColor: "var(--mode-color-action-main-default)",
                      color: "var(--mode-color-action-main-with-default)",
                    }}
                  >
                    Focus State
                  </SwatchBox>
                </ComponentRow>
              </ComponentCard>
            )}

            {/* Button Sizes */}
            <ComponentCard $isDarkMode={isDarkMode}>
              <h4
                style={{
                  font: "var(--global-font-static-body-medium-m)",
                  color: isDarkMode ? "#ffffff" : "#000000",
                }}
              >
                Button Sizes
              </h4>
              <ComponentRow>
                <Button size="small" variant="default" variantType="primary">
                  Small
                </Button>
                <Button size="medium" variant="default" variantType="primary">
                  Medium
                </Button>
                <Button size="large" variant="default" variantType="primary">
                  Large
                </Button>
              </ComponentRow>
            </ComponentCard>
          </ComponentsGrid>
        </PreviewArea>
      </Container>
    </TokensWrapper>
  );
};

export default Preview;
