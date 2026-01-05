import { ReactNode } from "react";
import TopInfoBar from "./TopInfoBar";
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopInfoBar />
      <HeaderNav />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppShell;
