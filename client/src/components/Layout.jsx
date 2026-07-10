import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";

const Layout = () => {
  return (
    <div className="h-screen flex bg-[var(--color-bg-app)] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 pb-20 md:p-6 lg:p-8 md:pb-6 bg-[var(--color-bg-app)]">
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  );
};

export default Layout;
