import { AlertToast } from "../../components/AlertToast";
import { Loader } from "../../components/Loader";
import { MainContent } from "../../components/MainContent";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";

export interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  const { open } = useAppSelector((state) => state.alert);

  return (
    <div className="layout-container">
      <Navbar />
      <MainContent>
        <div className="content-container">{children}</div>
      </MainContent>
      <Sidebar />
      <Loader />
      {open && <AlertToast />}
    </div>
  );
}
