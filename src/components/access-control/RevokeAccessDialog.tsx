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
import { AlertTriangle, User, Database, Tag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DirectAccessGrant {
  id: string;
  userName: string;
  userEmail: string;
  modelName: string;
  modelType: string;
  grantedAt: string;
  grantedBy: string;
}

interface RevokeAccessDialogProps {
  grant: DirectAccessGrant | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RevokeAccessDialog({ grant, open, onOpenChange }: RevokeAccessDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!grant) return null;

  const handleRevoke = async () => {
    setIsLoading(true);

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Direct access revoked",
        description: `${grant.userName}'s direct access to ${grant.modelName} has been revoked.`
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error revoking access",
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
      default: return 'outline';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Revoke Direct Access
          </DialogTitle>
          <DialogDescription>
            This will remove the user's direct access to the model. This action can be undone by granting access again.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-full">
                <User className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">{grant.userName}</div>
                <div className="text-sm text-muted-foreground">{grant.userEmail}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-full">
                <Database className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{grant.modelName}</span>
                <Badge variant={getTypeBadgeVariant(grant.modelType)} className="text-xs">
                  <Tag className="mr-1 h-3 w-3" />
                  {grant.modelType}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <p><strong>Grant Details:</strong></p>
            <ul className="space-y-1 text-muted-foreground ml-2">
              <li>Granted: {formatDate(grant.grantedAt)}</li>
              <li>Granted by: {grant.grantedBy}</li>
            </ul>
          </div>

          <div className="space-y-2 text-sm">
            <p><strong>What happens when you revoke this access:</strong></p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
              <li>The user will lose direct access to this model</li>
              <li>They may still have access through organization membership</li>
              <li>The user will be notified of the change</li>
              <li>Access can be granted again later if needed</li>
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
            onClick={handleRevoke}
            disabled={isLoading}
          >
            {isLoading ? 'Revoking...' : 'Revoke Access'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}