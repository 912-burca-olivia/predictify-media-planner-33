import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, User, Database, Tag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Model {
  id: string;
  name: string;
  type: string;
  description?: string;
}

interface GrantDirectAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GrantDirectAccessDialog({ open, onOpenChange }: GrantDirectAccessDialogProps) {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [modelSearchQuery, setModelSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with actual data fetching
  const users: User[] = [
    { id: '1', name: 'John Smith', email: 'john.smith@company.com' },
    { id: '2', name: 'Sarah Chen', email: 'sarah.chen@company.com' },
    { id: '3', name: 'Mike Johnson', email: 'mike.johnson@company.com' },
    { id: '4', name: 'Emily Davis', email: 'emily.davis@company.com' }
  ];

  const models: Model[] = [
    { id: '1', name: 'Advanced Analytics Pro', type: 'Analytics', description: 'Advanced analytics and reporting' },
    { id: '2', name: 'Premium Forecasting', type: 'Forecasting', description: 'Advanced forecasting with ML' },
    { id: '3', name: 'Creative Analytics', type: 'Analytics', description: 'Creative performance analysis' },
    { id: '4', name: 'Real-time Bidding', type: 'Automation', description: 'Automated bidding strategies' }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(modelSearchQuery.toLowerCase()) ||
    model.type.toLowerCase().includes(modelSearchQuery.toLowerCase())
  );

  const selectedUserData = users.find(u => u.id === selectedUser);
  const selectedModelData = models.find(m => m.id === selectedModel);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser) {
      toast({
        title: "User required",
        description: "Please select a user.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedModel) {
      toast({
        title: "Model required",
        description: "Please select a model.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Direct access granted",
        description: `${selectedUserData?.name} now has direct access to ${selectedModelData?.name}.`
      });
      
      onOpenChange(false);
      setSelectedUser('');
      setSelectedModel('');
      setUserSearchQuery('');
      setModelSearchQuery('');
    } catch (error) {
      toast({
        title: "Error granting access",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case 'analytics': return 'default';
      case 'planning': return 'secondary';
      case 'optimization': return 'outline';
      case 'forecasting': return 'secondary';
      case 'automation': return 'default';
      default: return 'outline';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Grant Direct Access</DialogTitle>
            <DialogDescription>
              Grant a specific user direct access to a model outside of organization membership.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <Label htmlFor="user">User *</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {filteredUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="model">Model *</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search models..."
                  value={modelSearchQuery}
                  onChange={(e) => setModelSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {filteredModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{model.name}</span>
                            <Badge variant={getTypeBadgeVariant(model.type)} className="text-xs">
                              <Tag className="mr-1 h-3 w-3" />
                              {model.type}
                            </Badge>
                          </div>
                          {model.description && (
                            <div className="text-xs text-muted-foreground">{model.description}</div>
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedUserData && selectedModelData && (
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium">Grant Summary</p>
                <div className="text-sm">
                  <strong>{selectedUserData.name}</strong> will gain direct access to <strong>{selectedModelData.name}</strong>
                </div>
                <p className="text-xs text-muted-foreground">
                  This access is independent of organization membership and can be revoked separately.
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !selectedUser || !selectedModel}>
              {isLoading ? 'Granting...' : 'Grant Access'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}