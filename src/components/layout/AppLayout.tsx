
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileWarning from './MobileWarning';
import { SidebarProvider } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileWarning />;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header isAdvancedMode={isAdvancedMode} setIsAdvancedMode={setIsAdvancedMode} />
          <main className="flex-1 overflow-auto p-6">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
