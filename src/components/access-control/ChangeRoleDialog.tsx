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
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  joinedAt: string;
}

interface ChangeRoleDialogProps {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangeRoleDialog({ member, open, onOpenChange }: ChangeRoleDialogProps) {
  const [newRole, setNewRole] = useState<'admin' | 'member'>('member');
  const [isLoading, setIsLoading] = useState(false);

  if (!member) return null;

  const isDowngrading = member.role === 'admin' && newRole === 'member';
  const isUpgrading = member.role === 'member' && newRole === 'admin';
  const noChange = member.role === newRole;

  const handleRoleChange = async () => {
    if (noChange) {
      onOpenChange(false);
      return;
    }

    setIsLoading(true);

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Role updated",
        description: `${member.name} is now ${newRole === 'admin' ? 'an' : 'a'} ${newRole}.`
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error updating role",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Change Member Role
          </DialogTitle>
          <DialogDescription>
            Update the role and permissions for this organization member.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{member.name}</span>
              <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                Current: {member.role}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">{member.email}</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">New Role</Label>
            <Select 
              value={newRole} 
              onValueChange={(value: 'member' | 'admin') => setNewRole(value)}
              defaultValue={member.role}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">
                  <div className="flex flex-col items-start">
                    <span>Member</span>
                    <span className="text-xs text-muted-foreground">Read-only access to organization</span>
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

          {isDowngrading && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-destructive mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Admin to Member</span>
              </div>
              <p className="text-sm text-muted-foreground">
                This member will lose the ability to manage organization members and models.
              </p>
            </div>
          )}

          {isUpgrading && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Member to Admin</span>
              </div>
              <p className="text-sm text-muted-foreground">
                This member will gain full management permissions for the organization.
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
          <Button 
            onClick={handleRoleChange}
            disabled={isLoading || noChange}
          >
            {isLoading ? 'Updating...' : 'Update Role'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}