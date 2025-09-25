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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, User, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AddMemberDialogProps {
  organizationId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMemberDialog({ organizationId, open, onOpenChange }: AddMemberDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [role, setRole] = useState<'member' | 'admin'>('member');
  const [isLoading, setIsLoading] = useState(false);

  // Mock available users - replace with actual data fetching
  const availableUsers: User[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@company.com'
    },
    {
      id: '2',
      name: 'Bob Williams',
      email: 'bob.williams@company.com'
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol.davis@company.com'
    },
    {
      id: '4',
      name: 'David Miller',
      email: 'david.miller@company.com'
    },
    {
      id: '5',
      name: 'Eva Wilson',
      email: 'eva.wilson@company.com'
    }
  ];

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserToggle = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedUsers.length === 0) {
      toast({
        title: "No users selected",
        description: "Please select at least one user to add.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const selectedUserNames = availableUsers
        .filter(user => selectedUsers.includes(user.id))
        .map(user => user.name);
      
      toast({
        title: "Members added",
        description: `Successfully added ${selectedUsers.length} member${selectedUsers.length > 1 ? 's' : ''} as ${role}${selectedUsers.length > 1 ? 's' : ''}.`
      });
      
      onOpenChange(false);
      setSelectedUsers([]);
      setSearchQuery('');
      setRole('member');
    } catch (error) {
      toast({
        title: "Error adding members",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add Members</DialogTitle>
          <DialogDescription>
            Select users to add to this organization. They will be added with the selected role.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="space-y-4 flex-1 min-h-0">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value: 'member' | 'admin') => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">
                    <div className="flex flex-col items-start">
                      <span>Member</span>
                      <span className="text-xs text-muted-foreground">Read-only access</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex flex-col items-start">
                      <span>Admin</span>
                      <span className="text-xs text-muted-foreground">Can manage members and models</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search available users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Available Users ({filteredUsers.length})</Label>
              {filteredUsers.length > 0 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleSelectAll}
                >
                  {selectedUsers.length === filteredUsers.length ? 'Deselect All' : 'Select All'}
                </Button>
              )}
            </div>

            <div className="overflow-y-auto space-y-3 border rounded-lg p-4 flex-1 min-h-0">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8">
                  <User className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    {searchQuery ? 'No users found matching your search.' : 'No users available to add.'}
                  </p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={user.id}
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => handleUserToggle(user.id)}
                    />
                    <div className="flex-1 space-y-1">
                      <Label htmlFor={user.id} className="font-medium cursor-pointer">
                        {user.name}
                      </Label>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {selectedUsers.length > 0 && (
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm">
                  <strong>{selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  These users will be added as {role}{selectedUsers.length > 1 ? 's' : ''} to the organization.
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter className="mt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || selectedUsers.length === 0}>
              {isLoading ? 'Adding...' : `Add ${selectedUsers.length || ''} Member${selectedUsers.length !== 1 ? 's' : ''}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}