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
import { AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  joinedAt: string;
}

interface RemoveMemberDialogProps {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RemoveMemberDialog({ member, open, onOpenChange }: RemoveMemberDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!member) return null;

  const handleRemove = async () => {
    setIsLoading(true);

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Member removed",
        description: `${member.name} has been removed from the organization.`
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error removing member",
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
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Remove Member
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. The member will lose access to all organization resources.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{member.name}</span>
              <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                {member.role}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">{member.email}</div>
          </div>
          
          <div className="mt-4 space-y-2 text-sm">
            <p><strong>What happens when you remove this member:</strong></p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
              <li>They will lose access to all organization models</li>
              <li>Their organization membership will be revoked</li>
              <li>They will be notified via email</li>
              {member.role === 'admin' && (
                <li className="text-destructive font-medium">
                  This will remove an admin from the organization
                </li>
              )}
            </ul>
          </div>
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
            variant="destructive" 
            onClick={handleRemove}
            disabled={isLoading}
          >
            {isLoading ? 'Removing...' : 'Remove Member'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}