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
import { AlertTriangle, Tag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AssignedModel {
  id: string;
  name: string;
  type: string;
  description?: string;
  assignedAt: string;
}

interface UnassignModelDialogProps {
  model: AssignedModel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UnassignModelDialog({ model, open, onOpenChange }: UnassignModelDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!model) return null;

  const handleUnassign = async () => {
    setIsLoading(true);

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Model unassigned",
        description: `${model.name} has been unassigned from the organization.`
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error unassigning model",
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Unassign Model
          </DialogTitle>
          <DialogDescription>
            This will remove the model from the organization. Members will lose access unless they have direct access.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{model.name}</span>
              <Badge variant={getTypeBadgeVariant(model.type)} className="text-xs">
                <Tag className="mr-1 h-3 w-3" />
                {model.type}
              </Badge>
            </div>
            {model.description && (
              <div className="text-sm text-muted-foreground">{model.description}</div>
            )}
          </div>
          
          <div className="mt-4 space-y-2 text-sm">
            <p><strong>What happens when you unassign this model:</strong></p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
              <li>All organization members will lose access to this model</li>
              <li>The model will be removed from the organization's available models</li>
              <li>Members with direct access to this model will keep their access</li>
              <li>This action can be reversed by reassigning the model</li>
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
            onClick={handleUnassign}
            disabled={isLoading}
          >
            {isLoading ? 'Unassigning...' : 'Unassign Model'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}