
import { User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  isAdvancedMode: boolean;
  setIsAdvancedMode: (value: boolean) => void;
}

const Header = ({ isAdvancedMode, setIsAdvancedMode }: HeaderProps) => {
  // Mock user data (would come from auth context in a real app)
  const user = {
    name: 'Demo User',
    email: 'demo@predictify.com',
    avatarUrl: ''
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Would trigger authentication logout in a real app
  };

  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-predictify-purple">
            Predictify<span className="font-normal text-foreground"> Media Planner</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center gap-2">
            <Button 
              variant={isAdvancedMode ? "outline" : "default"} 
              size="sm"
              onClick={() => setIsAdvancedMode(false)}
              className="relative"
            >
              Standard
              {!isAdvancedMode && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-predictify-purple"></span>
              )}
            </Button>
            <Button 
              variant={isAdvancedMode ? "default" : "outline"} 
              size="sm"
              onClick={() => setIsAdvancedMode(true)}
              className="relative"
            >
              Advanced
              {isAdvancedMode && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-predictify-purple"></span>
              )}
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="bg-predictify-purple text-white">
                      {user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
