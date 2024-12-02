import { MainContent } from "../../components/Main";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
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
