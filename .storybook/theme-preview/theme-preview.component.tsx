import React, { useState } from "react";
import styled from "styled-components";

import TokensWrapper from "../../src/components/tokens-wrapper";
import Button from "../../src/components/button/__next__";
import Link from "../../src/components/link";
import Box from "../../src/components/box";
import type { BrandColors } from "../../src/components/tokens-wrapper/__internal__/utils/build-override-tokens";

interface ThemePreviewState {
  lightPrimary: string;
  lightPrimaryHover: string;
  lightPrimaryActive: string;
  lightOnPrimary: string;
  lightInversePrimary: string;
  lightInversePrimaryHover: string;
  lightInversePrimaryActive: string;
  lightInverseOnPrimary: string;
  darkPrimary: string;
  darkPrimaryHover: string;
  darkPrimaryActive: string;
  darkOnPrimary: string;
  darkInversePrimary: string;
  darkInversePrimaryHover: string;
  darkInversePrimaryActive: string;
  darkInverseOnPrimary: string;
}

const Container = styled.div`
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

const ColorGroup = styled.div<{ $isDarkMode: boolean }>`
  margin-bottom: 28px;

  label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 8px;
    color: ${({ $isDarkMode }) => ($isDarkMode ? "#d0d0d0" : "#525252")};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const ColorInputWrapper = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;

  input[type="color"] {
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type="text"] {
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

interface ThemePreviewProps {
  modeOverride?: "light" | "dark";
}

const ThemePreview: React.FC<ThemePreviewProps> = ({
  modeOverride = "light",
}) => {
  const isDarkMode = modeOverride === "dark";

  const [state, setState] = useState<ThemePreviewState>({
    lightPrimary: "#0043ce",
    lightPrimaryHover: "#0039b8",
    lightPrimaryActive: "#002aa8",
    lightOnPrimary: "#ffffff",
    lightInversePrimary: "#9eea00",
    lightInversePrimaryHover: "#b8f255",
    lightInversePrimaryActive: "#85c700",
    lightInverseOnPrimary: "#161616",
    darkPrimary: "#4589ff",
    darkPrimaryHover: "#66b3ff",
    darkPrimaryActive: "#82c5ff",
    darkOnPrimary: "#161616",
    darkInversePrimary: "#2f7d32",
    darkInversePrimaryHover: "#3a9540",
    darkInversePrimaryActive: "#246428",
    darkInverseOnPrimary: "#ffffff",
  });

  const buildOverrides = (): BrandColors => ({
    light: {
      primary: state.lightPrimary,
      primaryHover: state.lightPrimaryHover,
      primaryActive: state.lightPrimaryActive,
      onPrimary: state.lightOnPrimary,
      inverse: {
        primary: state.lightInversePrimary,
        primaryHover: state.lightInversePrimaryHover,
        primaryActive: state.lightInversePrimaryActive,
        onPrimary: state.lightInverseOnPrimary,
      },
    },
    dark: {
      primary: state.darkPrimary,
      primaryHover: state.darkPrimaryHover,
      primaryActive: state.darkPrimaryActive,
      onPrimary: state.darkOnPrimary,
      inverse: {
        primary: state.darkInversePrimary,
        primaryHover: state.darkInversePrimaryHover,
        primaryActive: state.darkInversePrimaryActive,
        onPrimary: state.darkInverseOnPrimary,
      },
    },
  });

  const handleColorChange = (key: keyof ThemePreviewState, value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const resetColors = () => {
    setState({
      lightPrimary: "#0043ce",
      lightPrimaryHover: "#0039b8",
      lightPrimaryActive: "#002aa8",
      lightOnPrimary: "#ffffff",
      lightInversePrimary: "#9eea00",
      lightInversePrimaryHover: "#b8f255",
      lightInversePrimaryActive: "#85c700",
      lightInverseOnPrimary: "#161616",
      darkPrimary: "#4589ff",
      darkPrimaryHover: "#66b3ff",
      darkPrimaryActive: "#82c5ff",
      darkOnPrimary: "#161616",
      darkInversePrimary: "#2f7d32",
      darkInversePrimaryHover: "#3a9540",
      darkInversePrimaryActive: "#246428",
      darkInverseOnPrimary: "#ffffff",
    });
  };

  const renderColorInput = (
    label: string,
    key: keyof ThemePreviewState,
    value: string,
  ) => (
    <ColorGroup $isDarkMode={isDarkMode}>
      <label>{label}</label>
      <ColorInputWrapper $isDarkMode={isDarkMode}>
        <input
          type="color"
          value={value}
          onChange={(e) => handleColorChange(key, e.target.value)}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => handleColorChange(key, e.target.value)}
          placeholder="#000000"
        />
      </ColorInputWrapper>
    </ColorGroup>
  );

  return (
    <TokensWrapper
      modeSupportOptIn
      modeOverride={modeOverride}
      overrides={buildOverrides()}
    >
      <Container>
        {/* Sidebar */}
        <Sidebar $isDarkMode={isDarkMode}>
          <h2>Brand Colors</h2>

          <h3
            style={{
              fontSize: "13px",
              marginBottom: "12px",
              color: isDarkMode ? "#f5f5f5" : "#161616",
            }}
          >
            Light Mode
          </h3>
          {renderColorInput("Primary", "lightPrimary", state.lightPrimary)}
          {renderColorInput(
            "Primary Hover",
            "lightPrimaryHover",
            state.lightPrimaryHover,
          )}
          {renderColorInput(
            "Primary Active",
            "lightPrimaryActive",
            state.lightPrimaryActive,
          )}
          {renderColorInput(
            "Text on Primary",
            "lightOnPrimary",
            state.lightOnPrimary,
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
            "Primary",
            "lightInversePrimary",
            state.lightInversePrimary,
          )}
          {renderColorInput(
            "Primary Hover",
            "lightInversePrimaryHover",
            state.lightInversePrimaryHover,
          )}
          {renderColorInput(
            "Primary Active",
            "lightInversePrimaryActive",
            state.lightInversePrimaryActive,
          )}
          {renderColorInput(
            "Text on Primary",
            "lightInverseOnPrimary",
            state.lightInverseOnPrimary,
          )}

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
          {renderColorInput("Primary", "darkPrimary", state.darkPrimary)}
          {renderColorInput(
            "Primary Hover",
            "darkPrimaryHover",
            state.darkPrimaryHover,
          )}
          {renderColorInput(
            "Primary Active",
            "darkPrimaryActive",
            state.darkPrimaryActive,
          )}
          {renderColorInput(
            "Text on Primary",
            "darkOnPrimary",
            state.darkOnPrimary,
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
            "Primary",
            "darkInversePrimary",
            state.darkInversePrimary,
          )}
          {renderColorInput(
            "Primary Hover",
            "darkInversePrimaryHover",
            state.darkInversePrimaryHover,
          )}
          {renderColorInput(
            "Primary Active",
            "darkInversePrimaryActive",
            state.darkInversePrimaryActive,
          )}
          {renderColorInput(
            "Text on Primary",
            "darkInverseOnPrimary",
            state.darkInverseOnPrimary,
          )}

          <ResetButton $isDarkMode={isDarkMode} onClick={resetColors}>
            Reset to Defaults
          </ResetButton>
        </Sidebar>

        {/* Main Preview */}
        <PreviewArea $isDarkMode={isDarkMode}>
          <PreviewHeader $isDarkMode={isDarkMode}>
            <h2>Live Component Preview</h2>
            <p>Only components that currently react to brand token overrides</p>
          </PreviewHeader>

          <ComponentsGrid>
            {/* Next Buttons */}
            <ComponentCard $isDarkMode={isDarkMode}>
              <h3>Buttons (Next)</h3>
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
              <h3>Buttons (Inverse)</h3>
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
              <h3>Links</h3>
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
              <h3>Links (Inverse)</h3>
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
            <ComponentCard $isDarkMode={isDarkMode}>
              <h3>Brand Token Swatches</h3>
              <ComponentRow>
                <SwatchBox
                  style={{
                    backgroundColor: state.lightPrimary,
                    color: state.lightOnPrimary,
                  }}
                >
                  Primary
                </SwatchBox>
              </ComponentRow>
              <ComponentRow>
                <SwatchBox
                  style={{
                    backgroundColor: state.lightPrimaryHover,
                    color: state.lightOnPrimary,
                  }}
                >
                  Hover State
                </SwatchBox>
              </ComponentRow>
              <ComponentRow>
                <SwatchBox
                  style={{
                    backgroundColor: state.lightPrimaryActive,
                    color: state.lightOnPrimary,
                  }}
                >
                  Active State
                </SwatchBox>
              </ComponentRow>
            </ComponentCard>

            {/* Button Sizes */}
            <ComponentCard $isDarkMode={isDarkMode}>
              <h3>Button Sizes</h3>
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

export default ThemePreview;
