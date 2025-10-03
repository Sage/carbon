import React, {
  createContext,
  Dispatch,
  useState,
  useContext,
  SetStateAction,
} from "react";

interface TabsContextProps {
  activeTab: number;
  focusIndex: number;
  labelledBy?: string;
  orientation?: "horizontal" | "vertical";
  setActiveTab: Dispatch<SetStateAction<number>>;
  setFocusIndex: Dispatch<SetStateAction<number>>;
  size?: "medium" | "large";
}

const initialContext: TabsContextProps = {
  activeTab: 0,
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

  labelledBy?: string;
  orientation?: "horizontal" | "vertical";
  size?: "medium" | "large";
}

export const TabsProvider = ({
  children,
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
