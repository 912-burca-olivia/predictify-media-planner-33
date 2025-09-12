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
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Database, Tag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Model {
  id: string;
  name: string;
  type: string;
  description?: string;
}

interface AssignModelsDialogProps {
  organizationId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignModelsDialog({ organizationId, open, onOpenChange }: AssignModelsDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock available models - replace with actual data fetching
  const availableModels: Model[] = [
    {
      id: '6',
      name: 'Premium Forecasting',
      type: 'Forecasting',
      description: 'Advanced forecasting with machine learning'
    },
    {
      id: '7',
      name: 'Creative Analytics',
      type: 'Analytics',
      description: 'Analyze creative performance and engagement'
    },
    {
      id: '8',
      name: 'Cross-Channel Optimizer',
      type: 'Optimization',
      description: 'Optimize campaigns across multiple channels'
    },
    {
      id: '9',
      name: 'Attribution Modeling',
      type: 'Analytics',
      description: 'Multi-touch attribution analysis'
    },
    {
      id: '10',
      name: 'Real-time Bidding',
      type: 'Automation',
      description: 'Automated real-time bidding strategies'
    }
  ];

  const filteredModels = availableModels.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleModelToggle = (modelId: string) => {
    setSelectedModels(prev => 
      prev.includes(modelId)
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const handleSelectAll = () => {
    if (selectedModels.length === filteredModels.length) {
      setSelectedModels([]);
    } else {
      setSelectedModels(filteredModels.map(model => model.id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedModels.length === 0) {
      toast({
        title: "No models selected",
        description: "Please select at least one model to assign.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Models assigned",
        description: `Successfully assigned ${selectedModels.length} model${selectedModels.length > 1 ? 's' : ''} to the organization.`
      });
      
      onOpenChange(false);
      setSelectedModels([]);
      setSearchQuery('');
    } catch (error) {
      toast({
        title: "Error assigning models",
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Assign Models</DialogTitle>
          <DialogDescription>
            Select models to assign to this organization. All members will have access to assigned models.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="space-y-4 flex-1 min-h-0">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search available models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Available Models ({filteredModels.length})</Label>
              {filteredModels.length > 0 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleSelectAll}
                >
                  {selectedModels.length === filteredModels.length ? 'Deselect All' : 'Select All'}
                </Button>
              )}
            </div>

            <div className="overflow-y-auto space-y-3 border rounded-lg p-4 max-h-[300px]">
              {filteredModels.length === 0 ? (
                <div className="text-center py-8">
                  <Database className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    {searchQuery ? 'No models found matching your search.' : 'No models available to assign.'}
                  </p>
                </div>
              ) : (
                filteredModels.map((model) => (
                  <div key={model.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={model.id}
                      checked={selectedModels.includes(model.id)}
                      onCheckedChange={() => handleModelToggle(model.id)}
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={model.id} className="font-medium cursor-pointer">
                          {model.name}
                        </Label>
                        <Badge variant={getTypeBadgeVariant(model.type)} className="text-xs">
                          <Tag className="mr-1 h-3 w-3" />
                          {model.type}
                        </Badge>
                      </div>
                      {model.description && (
                        <p className="text-sm text-muted-foreground">{model.description}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {selectedModels.length > 0 && (
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm">
                  <strong>{selectedModels.length} model{selectedModels.length > 1 ? 's' : ''} selected</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  These models will be available to all organization members.
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
            <Button type="submit" disabled={isLoading || selectedModels.length === 0}>
              {isLoading ? 'Assigning...' : `Assign ${selectedModels.length || ''} Model${selectedModels.length !== 1 ? 's' : ''}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}