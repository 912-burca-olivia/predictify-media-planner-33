
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayCircle, BarChart3 } from 'lucide-react';
import MediaPlanTable from '../media/MediaPlanTable';
import AdvancedSettingsTables from '../media/AdvancedSettingsTables';

interface SimulationViewProps {
  isAdvancedMode?: boolean;
}

const SimulationView = ({ isAdvancedMode = false }: SimulationViewProps) => {
  const [selectedModel, setSelectedModel] = useState("predictify_roi");
  const [simulating, setSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  
  const handleRunSimulation = () => {
    setSimulating(true);
    
    // Simulate process
    setTimeout(() => {
      setSimulating(false);
      setSimulationComplete(true);
    }, 2000);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Media Plan Simulation</h1>
        <div className="flex items-center space-x-2">
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
          <Button 
            onClick={handleRunSimulation}
            disabled={simulating}
          >
            <PlayCircle className="mr-2 h-4 w-4" />
            {simulating ? 'Running...' : 'Run Simulation'}
          </Button>
        </div>
      </div>
      
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
