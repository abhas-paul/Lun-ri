import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children, showSidebar = false }) {
  return (
    <div className="min-h-screen" data-theme="calmpizza">
      <div className="flex">
        {showSidebar && (
          <aside>
            <Sidebar />
          </aside>
        )}

        <div className="flex flex-1 flex-col">
          <header>
            <Navbar />
          </header>

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;