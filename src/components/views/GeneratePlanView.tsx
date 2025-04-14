
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const GeneratePlanView = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Budget mode state
  const [budget, setBudget] = useState(1000000);
  
  // Target mode state
  const [targetSales, setTargetSales] = useState(2000000);
  
  // Common state
  const [activeChannels, setActiveChannels] = useState<Record<string, boolean>>({
    tv: true,
    radio: true,
    social: true,
    search: true,
    display: true,
    print: false,
    outdoor: false,
  });
  
  const handleGenerate = (mode: 'budget' | 'target') => {
    setIsGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, we would navigate to the simulation view with the generated plan
    }, 2000);
  };
  
  return (
    <div className="space-y-6 mx-auto max-w-2xl animate-fade-in">
      <h1 className="text-2xl font-bold">Auto Generate Media Plan</h1>
      <p className="text-muted-foreground">
        Create a new media plan based on your budget or sales target.
      </p>
      
      <Tabs defaultValue="budget" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="budget">Set Budget</TabsTrigger>
          <TabsTrigger value="target">Set Target</TabsTrigger>
        </TabsList>
        
        {/* Budget-based plan generation */}
        <TabsContent value="budget">
          <Card>
            <CardHeader>
              <CardTitle>Generate Plan from Budget</CardTitle>
              <CardDescription>
                Set your yearly budget and we'll create an optimized media plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="yearly-budget">Yearly Budget</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="yearly-budget"
                    type="text"
                    value={budget.toLocaleString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setBudget(value ? parseInt(value, 10) : 0);
                    }}
                    className="pl-7"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Active Channels</Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(activeChannels).map(([channel, isActive]) => (
                    <div key={channel} className="flex items-center space-x-2">
                      <Checkbox
                        id={`channel-${channel}`}
                        checked={isActive}
                        onCheckedChange={(checked) => 
                          setActiveChannels(prev => ({ ...prev, [channel]: !!checked }))
                        }
                      />
                      <Label htmlFor={`channel-${channel}`} className="capitalize">
                        {channel}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleGenerate('budget')} 
                disabled={isGenerating}
                className="w-full"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {isGenerating ? 'Generating...' : 'Generate Media Plan'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Target-based plan generation */}
        <TabsContent value="target">
          <Card>
            <CardHeader>
              <CardTitle>Generate Plan from Target</CardTitle>
              <CardDescription>
                Set your target sales goal and we'll create a media plan to reach it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-sales">Target Sales</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="target-sales"
                    type="text"
                    value={targetSales.toLocaleString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setTargetSales(value ? parseInt(value, 10) : 0);
                    }}
                    className="pl-7"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Active Channels</Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(activeChannels).map(([channel, isActive]) => (
                    <div key={channel} className="flex items-center space-x-2">
                      <Checkbox
                        id={`target-channel-${channel}`}
                        checked={isActive}
                        onCheckedChange={(checked) => 
                          setActiveChannels(prev => ({ ...prev, [channel]: !!checked }))
                        }
                      />
                      <Label htmlFor={`target-channel-${channel}`} className="capitalize">
                        {channel}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleGenerate('target')} 
                disabled={isGenerating}
                className="w-full"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {isGenerating ? 'Generating...' : 'Generate Media Plan'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GeneratePlanView;
