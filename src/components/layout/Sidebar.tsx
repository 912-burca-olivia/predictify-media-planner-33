
import { Button } from "@/components/ui/button";
import { Sidebar as UISidebar } from "@/components/ui/sidebar";
import { 
  BarChart3, 
  FilePlus, 
  FileText, 
  FolderOpen,
  Sparkles
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useMediaPlan } from "@/contexts/MediaPlanContext";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const { channels, months } = useMediaPlan();
  
  // Calculate total number of channels and months for the badge
  const totalChannels = channels.length;
  const totalMonths = months.length;
  
  return (
    <UISidebar className="border-r" hideCollapsed={false}>
      <div className="flex h-full flex-col py-3 px-3 gap-1">
        <div className="h-10 flex items-center">
          <span className="text-lg text-primary font-semibold px-2">Predictify</span>
        </div>
        
        <div className="flex-1 flex flex-col gap-0.5 mt-4">
          <Button variant="ghost" className="justify-start h-10 px-2" asChild>
            <a href="/" onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new Event('popstate'));
            }}>
              <BarChart3 className="mr-2 h-4 w-4" />
              <span className="truncate">Media Plan Simulation</span>
            </a>
          </Button>
          
          <Button variant="ghost" className="justify-start h-10 px-2" asChild>
            <a href="/auto-generate" onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new Event('popstate'));
            }}>
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="truncate">Auto Generate</span>
            </a>
          </Button>
          
          <Button variant="ghost" className="justify-start h-10 px-2">
            <FileText className="mr-2 h-4 w-4" />
            <span className="truncate">Upload Plan</span>
          </Button>
          
          <Button variant="ghost" className="justify-start h-10 px-2">
            <FilePlus className="mr-2 h-4 w-4" />
            <span className="truncate">New Plan</span>
          </Button>
          
          <Button variant="ghost" className="justify-start h-10 px-2">
            <FolderOpen className="mr-2 h-4 w-4" />
            <span className="truncate">Media Plan Library</span>
          </Button>
        </div>
        
        <div className="px-2 py-3 border-t">
          <div className="text-xs text-muted-foreground flex justify-between">
            <span>Channels</span>
            <span className="bg-muted rounded-sm px-1">{totalChannels}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1 flex justify-between">
            <span>Time Periods</span>
            <span className="bg-muted rounded-sm px-1">{totalMonths}</span>
          </div>
        </div>
      </div>
    </UISidebar>
  );
};

export default Sidebar;
