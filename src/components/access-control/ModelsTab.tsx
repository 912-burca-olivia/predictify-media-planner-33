import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Search, MoreHorizontal, Shield, Database, Tag } from 'lucide-react';
import { AssignModelsDialog } from './AssignModelsDialog';
import { UnassignModelDialog } from './UnassignModelDialog';

interface AssignedModel {
  id: string;
  name: string;
  type: string;
  description?: string;
  assignedAt: string;
}

interface ModelsTabProps {
  organizationId: string;
  userRole: 'admin' | 'member';
}

export function ModelsTab({ organizationId, userRole }: ModelsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AssignedModel | null>(null);

  // Mock data - replace with actual data fetching
  const assignedModels: AssignedModel[] = [
    {
      id: '1',
      name: 'Advanced Analytics Pro',
      type: 'Analytics',
      description: 'Advanced analytics and reporting capabilities',
      assignedAt: '2024-09-10'
    },
    {
      id: '2',
      name: 'Media Planning Suite',
      type: 'Planning',
      description: 'Comprehensive media planning and optimization',
      assignedAt: '2024-09-08'
    },
    {
      id: '3',
      name: 'Audience Insights',
      type: 'Analytics',
      description: 'Deep audience analysis and segmentation',
      assignedAt: '2024-09-05'
    },
    {
      id: '4',
      name: 'Campaign Optimizer',
      type: 'Optimization',
      description: 'AI-powered campaign optimization',
      assignedAt: '2024-09-03'
    },
    {
      id: '5',
      name: 'Budget Forecaster',
      type: 'Forecasting',
      description: 'Predictive budget planning and allocation',
      assignedAt: '2024-09-01'
    }
  ];

  const filteredModels = assignedModels.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleUnassignModel = (model: AssignedModel) => {
    setSelectedModel(model);
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        {userRole === 'admin' && (
          <Button onClick={() => setShowAssignDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Assign Models
          </Button>
        )}
      </div>

      {userRole === 'member' && (
        <div className="bg-muted/50 border rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            You have read-only access to organization models
          </div>
        </div>
      )}

      <div className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
        <strong>About model access:</strong> All organization members can use these assigned models. 
        Individual users may also have direct access to additional models outside of this organization.
      </div>

      {filteredModels.length === 0 ? (
        <div className="text-center py-12">
          <Database className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {searchQuery ? 'No models found' : 'No models assigned'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery 
              ? 'No models match your search criteria.'
              : 'Assign models so members can use them for their work.'
            }
          </p>
          {userRole === 'admin' && !searchQuery && (
            <Button onClick={() => setShowAssignDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Assign Models
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredModels.map((model) => (
            <div key={model.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">{model.name}</h4>
                  <Badge variant={getTypeBadgeVariant(model.type)} className="text-xs">
                    <Tag className="mr-1 h-3 w-3" />
                    {model.type}
                  </Badge>
                </div>
                {userRole === 'admin' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => handleUnassignModel(model)}
                        className="text-destructive"
                      >
                        Unassign Model
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              
              {model.description && (
                <p className="text-sm text-muted-foreground">{model.description}</p>
              )}
              
              <div className="text-xs text-muted-foreground">
                Assigned {formatDate(model.assignedAt)}
              </div>
            </div>
          ))}
        </div>
      )}

      <AssignModelsDialog
        organizationId={organizationId}
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
      />

      <UnassignModelDialog
        model={selectedModel}
        open={!!selectedModel}
        onOpenChange={(open) => !open && setSelectedModel(null)}
      />
    </div>
  );
}