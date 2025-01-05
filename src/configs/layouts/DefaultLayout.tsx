import { MainContent } from "../../components/MainContent";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { ReactNode } from "react";

export interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="layout-container">
      <Navbar />
      <MainContent>
        <div className="content-container">{children}</div>
      </MainContent>
      <Sidebar />
    </div>
  );
}
