
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PlayCircle, BarChart3 } from 'lucide-react';
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
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Media Plan Simulation</h1>
        <div className="flex items-center space-x-2">
          {isAdvancedMode ? (
            <div className="w-[300px]">
              <Label className="text-sm font-medium mb-2 block">Select Models</Label>
              <div className="space-y-2 border rounded-md p-3 bg-background">
                {availableModels.map((model) => (
                  <div key={model.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={model.id}
                      checked={selectedModels.includes(model.id)}
                      onCheckedChange={(checked) => handleModelToggle(model.id, !!checked)}
                    />
                    <Label htmlFor={model.id} className="text-sm font-normal">
                      {model.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ) : (
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
            <CardTitle>Model Allocations</CardTitle>
          </CardHeader>
          <CardContent>
            <ModelAllocationsTable selectedModels={selectedModels} />
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="budget" className="w-full">
        <TabsList>
          <TabsTrigger value="budget">Budget Simulation</TabsTrigger>
          <TabsTrigger value="optimization">Media Optimization</TabsTrigger>
          <TabsTrigger value="forecast">Sales Forecast</TabsTrigger>
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
