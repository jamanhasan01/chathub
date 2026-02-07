
import { Outlet } from 'react-router';
import { Aside } from './Aside';
import { Header } from './Header'; // Import the new header
import MobileNav from '../ui/MobileNav';


const AppLayout = () => {
  return (
    <div className="dark flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Left: Sidebar */}
      <div className="hidden lg:block">
        <Aside />
      </div>

      {/* Right: Content Section */}
      <div className="flex-1 flex flex-col relative">
        {/* Global Header */}
        <Header />
        
        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 ">
          <div className="max-w-7xl mx-auto h-full">
            {/* Page Container */}
            <div className="h-full  w-full  border border-border bg-white/[0.02] backdrop-blur-md  shadow-2xl">
              <Outlet />
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileNav />
      </div>
    </div>
  );
};

export default AppLayout;