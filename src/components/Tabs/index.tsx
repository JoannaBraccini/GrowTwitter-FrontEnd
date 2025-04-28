import { TabsStyle } from "./TabsStyle";

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  paddingTop?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, paddingTop }: TabProps) {
  return (
    <TabsStyle paddingTop={paddingTop}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={activeTab === tab ? "active" : ""}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </TabsStyle>
  );
}
