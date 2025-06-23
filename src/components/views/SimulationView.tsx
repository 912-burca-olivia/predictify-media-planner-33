
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { PlayCircle, BarChart3, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HelpTooltip } from '@/components/ui/help-tooltip';
import MediaPlanTable from '../media/MediaPlanTable';
import AdvancedSettingsTables from '../media/AdvancedSettingsTables';
import ModelAllocationsTable from '../media/ModelAllocationsTable';

interface SimulationViewProps {
  isAdvancedMode?: boolean;
}

const availableModels = [
  { id: "predictify_roi", name: "Predictify ROI Model" },
  { id: "predictify_mmm", name: "Predictify MMM" },
  { id: "custom_model", name: "Custom Model" },
  { id: "attribution_model", name: "Attribution Model" },
  { id: "regression_model", name: "Regression Model" }
];

const SimulationView = ({ isAdvancedMode = false }: SimulationViewProps) => {
  const [selectedModel, setSelectedModel] = useState("predictify_roi");
  const [selectedModels, setSelectedModels] = useState<string[]>(["predictify_roi"]);
  const [simulating, setSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  
  // Initialize with first model preselected in advanced mode
  useEffect(() => {
    if (isAdvancedMode && selectedModels.length === 0) {
      setSelectedModels(["predictify_roi"]);
    }
  }, [isAdvancedMode]);
  
  const handleRunSimulation = () => {
    setSimulating(true);
    
    // Simulate process
    setTimeout(() => {
      setSimulating(false);
      setSimulationComplete(true);
    }, 2000);
  };

  const handleModelToggle = (modelId: string, checked: boolean) => {
    if (checked) {
      setSelectedModels(prev => [...prev, modelId]);
    } else {
      setSelectedModels(prev => prev.filter(id => id !== modelId));
    }
  };

  const getSelectedModelsText = () => {
    if (selectedModels.length === 0) return "Select models";
    if (selectedModels.length === 1) {
      const model = availableModels.find(m => m.id === selectedModels[0]);
      return model?.name || "1 model selected";
    }
    return `${selectedModels.length} models selected`;
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Media Plan Simulation</h1>
        <div className="flex items-center space-x-2">
          {isAdvancedMode ? (
            <div className="w-[250px]">
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-sm font-medium">Select Models</Label>
                <HelpTooltip content="Choose one or more models to run your simulation. Multiple models allow you to compare different approaches and find the optimal media allocation strategy." />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {getSelectedModelsText()}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[250px] bg-background border shadow-md">
                  {availableModels.map((model) => (
                    <DropdownMenuCheckboxItem
                      key={model.id}
                      checked={selectedModels.includes(model.id)}
                      onCheckedChange={(checked) => handleModelToggle(model.id, !!checked)}
                    >
                      {model.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Model</Label>
                <HelpTooltip content="Select the predictive model to use for your simulation. Different models use various algorithms and data sources to optimize your media spend." />
              </div>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button 
            onClick={handleRunSimulation}
            disabled={simulating}
          >
            <PlayCircle className="mr-2 h-4 w-4" />
            {simulating ? 'Running...' : 'Run Simulation'}
          </Button>
        </div>
      </div>

      {isAdvancedMode && selectedModels.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Model Allocations</CardTitle>
              <HelpTooltip content="Configure how much weight each selected model should have in the final recommendation. Higher percentages give more influence to that model's results." />
            </div>
          </CardHeader>
          <CardContent>
            <ModelAllocationsTable selectedModels={selectedModels} />
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="budget" className="w-full">
        <TabsList>
          <TabsTrigger value="budget">
            <div className="flex items-center gap-2">
              Budget Simulation
              <HelpTooltip content="Optimize your media allocation based on a fixed budget constraint. Find the best way to distribute your spending across channels and time periods." />
            </div>
          </TabsTrigger>
          <TabsTrigger value="optimization">
            <div className="flex items-center gap-2">
              Media Optimization
              <HelpTooltip content="Advanced optimization that considers multiple constraints and objectives to find the optimal media mix for your goals." />
            </div>
          </TabsTrigger>
          <TabsTrigger value="forecast">
            <div className="flex items-center gap-2">
              Sales Forecast
              <HelpTooltip content="Predict future sales performance based on your planned media investments and historical data patterns." />
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="budget" className="space-y-6">
          <MediaPlanTable isAdvancedMode={isAdvancedMode} />
          
          {isAdvancedMode && <AdvancedSettingsTables />}
          
          {simulationComplete && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Simulation Results</h3>
                  <div className="bg-predictify-purple/10 text-predictify-purple px-3 py-1 rounded-full text-sm font-medium">
                    +12.4% ROI Improvement
                  </div>
                </div>
                <div className="h-64 mt-4 flex items-center justify-center bg-muted/30 rounded-md">
                  <div className="text-center">
                    <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      [Simulation results chart placeholder]
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="optimization" className="space-y-6">
          <MediaPlanTable isAdvancedMode={isAdvancedMode} />
          {isAdvancedMode && <AdvancedSettingsTables />}
        </TabsContent>
        
        <TabsContent value="forecast" className="space-y-6">
          <MediaPlanTable isAdvancedMode={isAdvancedMode} />
          {isAdvancedMode && <AdvancedSettingsTables />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulationView;
