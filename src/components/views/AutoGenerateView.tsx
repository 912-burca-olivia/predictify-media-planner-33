
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, ListPlus, ListMinus, Sparkles } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { useMediaPlan } from '@/contexts/MediaPlanContext';
import { toast } from '@/hooks/use-toast';

const AutoGenerateView = () => {
  // State for model selection and metric inputs
  const [selectedModel, setSelectedModel] = useState("predictify_roi");
  const [budgetMetric, setBudgetMetric] = useState(1000000);
  const [kpiMetric, setKpiMetric] = useState(2000000);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  
  // Get channels and months from context
  const { channels, months } = useMediaPlan();
  
  // State for selection matrix (month-channel combinations)
  const [selectionMatrix, setSelectionMatrix] = useState(() => {
    const matrix: Record<string, Record<string, boolean>> = {};
    
    months.forEach(month => {
      matrix[month.id] = {};
      channels.forEach(channel => {
        matrix[month.id][channel.id] = true; // All selected by default
      });
    });
    
    return matrix;
  });
  
  // Toggle a single cell
  const toggleCell = (monthId: string, channelId: string) => {
    setSelectionMatrix(prev => ({
      ...prev,
      [monthId]: {
        ...prev[monthId],
        [channelId]: !prev[monthId][channelId]
      }
    }));
  };
  
  // Toggle entire row (month)
  const toggleMonth = (monthId: string) => {
    const isAnySelected = Object.values(selectionMatrix[monthId]).some(value => value);
    const allSelected = Object.values(selectionMatrix[monthId]).every(value => value);
    
    // If all are selected or some are selected, deselect all. Otherwise, select all.
    const newValue = !(isAnySelected);
    
    setSelectionMatrix(prev => ({
      ...prev,
      [monthId]: Object.keys(prev[monthId]).reduce((acc, channelId) => {
        acc[channelId] = newValue;
        return acc;
      }, {} as Record<string, boolean>)
    }));
  };
  
  // Toggle entire column (channel)
  const toggleChannel = (channelId: string) => {
    const isAnySelected = Object.keys(selectionMatrix).some(monthId => 
      selectionMatrix[monthId][channelId]
    );
    
    const newValue = !isAnySelected;
    
    setSelectionMatrix(prev => {
      const newMatrix = { ...prev };
      Object.keys(newMatrix).forEach(monthId => {
        newMatrix[monthId] = {
          ...newMatrix[monthId],
          [channelId]: newValue
        };
      });
      return newMatrix;
    });
  };
  
  // Toggle all cells
  const toggleAll = () => {
    const isAnySelected = Object.keys(selectionMatrix).some(monthId => 
      Object.values(selectionMatrix[monthId]).some(value => value)
    );
    
    const newValue = !isAnySelected;
    
    setSelectionMatrix(prev => {
      const newMatrix = { ...prev };
      Object.keys(newMatrix).forEach(monthId => {
        Object.keys(newMatrix[monthId]).forEach(channelId => {
          newMatrix[monthId][channelId] = newValue;
        });
      });
      return newMatrix;
    });
  };
  
  // Handle generate button click
  const handleGenerate = (mode: 'budget' | 'kpi') => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      toast({
        title: "Media plan generated",
        description: `Optimized plan ${mode === 'budget' ? `with budget $${budgetMetric.toLocaleString()}` : `for KPI target $${kpiMetric.toLocaleString()}`}`,
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Auto Generate Media Plan</h1>
        <p className="text-muted-foreground">
          Create an optimized media plan based on your goals and constraints.
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Plan Parameters</h2>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="predictify_roi">Predictify ROI Model</SelectItem>
            <SelectItem value="predictify_mmm">Predictify MMM</SelectItem>
            <SelectItem value="custom_model">Custom Model</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="budget" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="budget">Optimize on Budget</TabsTrigger>
          <TabsTrigger value="kpi">Optimize on KPI Goal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="budget" className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="budget-input" className="text-sm font-medium">
              Budget
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="budget-input"
                type="text"
                value={budgetMetric.toLocaleString()}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setBudgetMetric(value ? parseInt(value, 10) : 0);
                }}
                className="pl-7"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="kpi" className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="kpi-input" className="text-sm font-medium">
              KPI Target
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="kpi-input"
                type="text"
                value={kpiMetric.toLocaleString()}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setKpiMetric(value ? parseInt(value, 10) : 0);
                }}
                className="pl-7"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Channel & Month Selection</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleAll}
              className="flex items-center gap-1"
            >
              <ListPlus className="h-4 w-4" />
              Select All
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleAll}
              className="flex items-center gap-1"
            >
              <ListMinus className="h-4 w-4" />
              Deselect All
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Month</TableHead>
                {channels.map(channel => (
                  <TableHead key={channel.id} className="text-center relative">
                    <div className="flex flex-col items-center">
                      <span>{channel.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleChannel(channel.id)}
                        className="h-6 w-6 p-0 absolute -bottom-1"
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {months.map(month => (
                <TableRow key={month.id}>
                  <TableCell className="font-medium relative">
                    <div className="flex items-center">
                      {month.name}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleMonth(month.id)}
                        className="h-6 w-6 p-0 ml-1"
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  {channels.map(channel => (
                    <TableCell key={`${month.id}-${channel.id}`} className="text-center">
                      <Checkbox
                        checked={selectionMatrix[month.id][channel.id]}
                        onCheckedChange={() => toggleCell(month.id, channel.id)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={() => handleGenerate(document.querySelector('[data-state="active"]')?.getAttribute('value') === 'budget' ? 'budget' : 'kpi')}
          disabled={isGenerating}
          className="px-6"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {isGenerating ? 'Generating...' : 'Generate Media Plan'}
        </Button>
      </div>
      
      {isGenerated && (
        <Card className="p-6 space-y-4 mt-6">
          <h2 className="text-xl font-medium">Optimized Media Plan</h2>
          
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Channel</TableHead>
                  {months.map(month => (
                    <TableHead key={month.id} className="text-center">
                      {month.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {channels.map(channel => (
                  <TableRow key={channel.id}>
                    <TableCell className="font-medium">
                      {channel.name}
                    </TableCell>
                    {months.map(month => (
                      <TableCell key={`result-${channel.id}-${month.id}`} className="text-right">
                        ${Math.floor(Math.random() * 100000).toLocaleString()}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AutoGenerateView;
