import { createContext } from "react";
import type { TabStyle, TabSize } from "./Tab";

export type TabsContextValue = {
  value: string | null;
  onSelect: (value: string) => void;
  style: TabStyle;
  size: TabSize;
  tabListId: string;
  tabIdPrefix: string;
} | null;

export const TabsContext = createContext<TabsContextValue>(null);
