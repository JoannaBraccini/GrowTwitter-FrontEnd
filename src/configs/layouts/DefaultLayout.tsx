import { ReactNode } from "react";
import { navigations } from "../navigations/navigation";
import { NavBar } from "../../components/Navbar";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <NavBar navigations={navigations} />
      <main>{children}</main>
      <footer />
    </>
  );
}
