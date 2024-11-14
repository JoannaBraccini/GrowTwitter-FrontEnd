import { navigations } from "../navigation/navigations";
import { NavBar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Main } from "../../components/Main";
import { ReactNode } from "react";
import { Header } from "../../components/Header/Header";

export interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <NavBar navigations={navigations} />
      <Main>{children}</Main>
      <Sidebar />
    </>
  );
}
