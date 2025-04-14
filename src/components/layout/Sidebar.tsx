
import { useState } from 'react';
import { 
  Upload, 
  Sparkles, 
  PlayCircle, 
  SlidersHorizontal,
  TrendingUp,
  FolderKanban,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { id: 'upload', label: 'Upload Plan', icon: Upload },
  { id: 'generate', label: 'Auto Generate Plan', icon: Sparkles },
  { id: 'simulate', label: 'Simulate', icon: PlayCircle },
  { id: 'optimize', label: 'Optimize', icon: SlidersHorizontal },
  { id: 'forecast', label: 'Forecast', icon: TrendingUp },
  { id: 'library', label: 'My Plans & Models', icon: FolderKanban },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('upload');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar transition-all duration-300 ease-in-out relative group",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                "flex items-center px-2 py-3 rounded-md w-full transition-colors",
                activeItem === item.id
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 bg-sidebar-accent rounded-full p-1 text-sidebar-foreground hover:text-sidebar-primary focus:outline-none"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default Sidebar;
