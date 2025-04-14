
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Share2, MoreHorizontal, Trash, Edit, Copy } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Sample data types
type MediaPlan = {
  id: string;
  name: string;
  lastModified: string;
  totalBudget: number;
  channels: number;
};

type Model = {
  id: string;
  name: string;
  type: string;
  lastModified: string;
};

const LibraryView = () => {
  // Sample data - in a real app, this would come from an API
  const [mediaPlans, setMediaPlans] = useState<MediaPlan[]>([
    { id: 'plan1', name: 'Q1 2025 Campaign', lastModified: '2025-03-20', totalBudget: 1250000, channels: 5 },
    { id: 'plan2', name: 'Summer Promotion', lastModified: '2025-03-15', totalBudget: 750000, channels: 4 },
    { id: 'plan3', name: 'Holiday Campaign', lastModified: '2025-03-10', totalBudget: 2000000, channels: 6 },
    { id: 'plan4', name: 'Brand Awareness', lastModified: '2025-03-01', totalBudget: 500000, channels: 3 },
  ]);

  const [models, setModels] = useState<Model[]>([
    { id: 'model1', name: 'ROI Model v2', type: 'Predictify MMM', lastModified: '2025-03-18' },
    { id: 'model2', name: 'Attribution Model', type: 'Custom', lastModified: '2025-03-10' },
    { id: 'model3', name: 'Sales Forecast', type: 'Predictify Forecast', lastModified: '2025-02-25' },
  ]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleDeletePlan = (planId: string) => {
    setMediaPlans(prevPlans => prevPlans.filter(plan => plan.id !== planId));
  };

  const handleDeleteModel = (modelId: string) => {
    setModels(prevModels => prevModels.filter(model => model.id !== modelId));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">My Plans & Models</h1>
      
      <Tabs defaultValue="plans" className="w-full">
        <TabsList>
          <TabsTrigger value="plans">Media Plans</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaPlans.map(plan => (
              <Card key={plan.id} className="group hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-1">{plan.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-70 group-hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Rename</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          <span>Share</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDeletePlan(plan.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm text-muted-foreground">
                    <p>Last modified: {plan.lastModified}</p>
                    <p>Total Budget: {formatCurrency(plan.totalBudget)}</p>
                    <p>Channels: {plan.channels}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="default" size="sm" className="w-full">
                    Open Plan
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="models" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map(model => (
              <Card key={model.id} className="group hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg line-clamp-1">{model.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{model.type}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-70 group-hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Rename</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDeleteModel(model.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm text-muted-foreground">
                    <p>Last modified: {model.lastModified}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="default" size="sm" className="w-full">
                    Use Model
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LibraryView;
