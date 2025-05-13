
import { Button } from "@/components/ui/button";
import { 
  Sidebar as UISidebar, 
  SidebarProvider, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { 
  BarChart3, 
  FilePlus, 
  FileText, 
  FolderOpen,
  Sparkles
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaPlan } from "@/contexts/MediaPlanContext";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { channels, months } = useMediaPlan();
  
  // Calculate total number of channels and months for the badge
  const totalChannels = channels.length;
  const totalMonths = months.length;
  
  return (
    <UISidebar className="border-r">
      <SidebarContent>
        <div className="flex h-full flex-col py-3 px-3 gap-1">
          <div className="h-10 flex items-center">
            <span className="text-lg text-primary font-semibold px-2">Predictify</span>
          </div>
          
          <div className="flex-1 flex flex-col gap-0.5 mt-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  variant="default" 
                  className="justify-start h-10 px-2"
                  onClick={() => navigate('/')}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span className="truncate">Media Plan Simulation</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  variant="default" 
                  className="justify-start h-10 px-2"
                  onClick={() => navigate('/auto-generate')}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span className="truncate">Auto Generate</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton variant="default" className="justify-start h-10 px-2">
                  <FileText className="mr-2 h-4 w-4" />
                  <span className="truncate">Upload Plan</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton variant="default" className="justify-start h-10 px-2">
                  <FilePlus className="mr-2 h-4 w-4" />
                  <span className="truncate">New Plan</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton variant="default" className="justify-start h-10 px-2">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  <span className="truncate">Media Plan Library</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
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
      </SidebarContent>
    </UISidebar>
  );
};

export default Sidebar;
