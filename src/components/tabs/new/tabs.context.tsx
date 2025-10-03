import React, {
  createContext,
  Dispatch,
  useState,
  useContext,
  SetStateAction,
} from "react";

interface TabsContextProps {
  activeTab: number;
  colorMode?: "light" | "dark";
  focusIndex: number;
  labelledBy?: string;
  orientation?: "horizontal" | "vertical";
  setActiveTab: Dispatch<SetStateAction<number>>;
  setFocusIndex: Dispatch<SetStateAction<number>>;
  size?: "medium" | "large";
}

const initialContext: TabsContextProps = {
  activeTab: 0,
  colorMode: "light",
  focusIndex: 0,
  labelledBy: "",
  orientation: "horizontal",
  setActiveTab: () => {},
  setFocusIndex: () => {},
  size: "medium",
};

const TabsContext = createContext<TabsContextProps | null>(initialContext);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
};

interface TabsProviderProps {
  children?: React.ReactNode;
  colorMode?: "light" | "dark";
  labelledBy?: string;
  orientation?: "horizontal" | "vertical";
  size?: "medium" | "large";
}

export const TabsProvider = ({
  children,
  colorMode,
  labelledBy,
  orientation,
  size,
}: TabsProviderProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [focusIndex, setFocusIndex] = useState<number>(0);

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        colorMode,
        focusIndex,
        labelledBy,
        orientation,
        setActiveTab,
        setFocusIndex,
        size,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
