
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, BookOpen, Settings, Zap, BarChart3, Upload, FileText, Sparkles, PlayCircle } from 'lucide-react';

interface GuideStep {
  title: string;
  description: string;
  content: React.ReactNode;
  highlights: string[];
}

const standardGuideSteps: GuideStep[] = [
  {
    title: "Welcome to Predictify",
    description: "Your AI-powered media planning and simulation platform",
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-predictify-purple/10 to-blue-500/10 rounded-lg p-6 border-2 border-dashed border-predictify-purple/30">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="h-8 w-8 text-predictify-purple" />
            <div>
              <h3 className="text-xl font-semibold">Media Plan Simulation</h3>
              <p className="text-muted-foreground">Main dashboard for planning and optimization</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-background/50 rounded p-3 text-center">
              <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <p className="text-sm">Budget Planning</p>
            </div>
            <div className="bg-background/50 rounded p-3 text-center">
              <Settings className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <p className="text-sm">Optimization</p>
            </div>
            <div className="bg-background/50 rounded p-3 text-center">
              <BarChart3 className="h-6 w-6 mx-auto mb-2 text-purple-500" />
              <p className="text-sm">Forecasting</p>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground">
          Predictify helps you optimize your media spend using advanced AI models. This guide will walk you through the Standard workflow.
        </p>
      </div>
    ),
    highlights: ["AI-powered optimization", "Multiple simulation modes", "Real-time results"]
  },
  {
    title: "Setting Up Your Media Plan",
    description: "Configure channels, budgets, and time periods",
    content: (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-muted/30">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Google Ads</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="bg-background rounded p-2 text-center">
                <p className="text-muted-foreground">Jan</p>
                <p className="font-medium">$5,000</p>
              </div>
              <div className="bg-background rounded p-2 text-center">
                <p className="text-muted-foreground">Feb</p>
                <p className="font-medium">$5,500</p>
              </div>
              <div className="bg-background rounded p-2 text-center">
                <p className="text-muted-foreground">Mar</p>
                <p className="font-medium">$6,000</p>
              </div>
              <div className="bg-background rounded p-2 text-center">
                <p className="text-muted-foreground">Apr</p>
                <p className="font-medium">$5,800</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Facebook Ads</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="bg-background rounded p-2 text-center">
                <p className="text-muted-foreground">Jan</p>
                <p className="font-medium">$3,000</p>
              </div>
              <div className="bg-background rounded p-2 text-center">
                <p className="text-muted-foreground">Feb</p>
                <p className="font-medium">$3,200</p>
              </div>
              <div className="bg-background rounded p-2 text-center">
                <p className="text-muted-foreground">Mar</p>
                <p className="font-medium">$3,500</p>
              </div>
              <div className="bg-background rounded p-2 text-center">
                <p className="text-muted-foreground">Apr</p>
                <p className="font-medium">$3,300</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> Click on any cell to edit budget amounts. You can add or remove channels using the controls at the top of the table.
        </p>
      </div>
    ),
    highlights: ["Edit budgets by clicking cells", "Add/remove channels", "View monthly breakdowns"]
  },
  {
    title: "Selecting Your Model",
    description: "Choose the AI model for your simulation",
    content: (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-muted/30">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Model Selection</h4>
            <div className="flex items-center space-x-2">
              <select className="border rounded px-3 py-1 text-sm bg-background">
                <option>Predictify ROI Model</option>
                <option>Predictify MMM</option>
                <option>Custom Model</option>
                <option>Attribution Model</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background rounded p-3">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Predictify ROI Model</span>
              </div>
              <p className="text-xs text-muted-foreground">Optimized for ROI maximization with real-time bidding insights</p>
            </div>
            <div className="bg-background/50 rounded p-3 opacity-60">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-muted rounded-full"></div>
                <span className="text-sm font-medium">Predictify MMM</span>
              </div>
              <p className="text-xs text-muted-foreground">Marketing Mix Modeling for attribution analysis</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> The Predictify ROI Model is recommended for most use cases as it provides the best balance of accuracy and speed.
        </p>
      </div>
    ),
    highlights: ["Multiple AI models available", "ROI Model recommended for beginners", "Real-time optimization"]
  },
  {
    title: "Running Your Simulation",
    description: "Execute the simulation and analyze results",
    content: (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-muted/30">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Simulation Controls</h4>
            <Button className="bg-predictify-purple hover:bg-predictify-purple/90">
              <PlayCircle className="mr-2 h-4 w-4" />
              Run Simulation
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Processing budget allocations...</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm">Analyzing channel performance...</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-muted rounded-full"></div>
              <span className="text-sm text-muted-foreground">Generating recommendations...</span>
            </div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-green-800">Simulation Complete!</h4>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              +12.4% ROI Improvement
            </div>
          </div>
          <p className="text-sm text-green-700 mt-2">
            Your optimized media plan shows significant improvement potential.
          </p>
        </div>
      </div>
    ),
    highlights: ["One-click simulation", "Real-time progress tracking", "Clear ROI improvements"]
  },
  {
    title: "Understanding Your Results",
    description: "Analyze the simulation outcomes and recommendations",
    content: (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-muted/30">
          <h4 className="font-medium mb-4">Results Dashboard</h4>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-background rounded p-3 text-center">
              <div className="text-2xl font-bold text-green-600">+12.4%</div>
              <div className="text-sm text-muted-foreground">ROI Improvement</div>
            </div>
            <div className="bg-background rounded p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">$45K</div>
              <div className="text-sm text-muted-foreground">Additional Revenue</div>
            </div>
            <div className="bg-background rounded p-3 text-center">
              <div className="text-2xl font-bold text-purple-600">15%</div>
              <div className="text-sm text-muted-foreground">Budget Efficiency</div>
            </div>
          </div>
          <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Interactive Charts & Insights</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> Use the tabs above to switch between Budget Simulation, Media Optimization, and Sales Forecast views.
        </p>
      </div>
    ),
    highlights: ["Key performance metrics", "Visual insights", "Actionable recommendations"]
  }
];

const advancedGuideSteps: GuideStep[] = [
  {
    title: "Advanced Mode Overview",
    description: "Unlock powerful multi-model analysis and advanced controls",
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-500/10 to-orange-500/10 rounded-lg p-6 border-2 border-dashed border-purple-500/30">
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="text-xl font-semibold">Advanced Mode Features</h3>
              <p className="text-muted-foreground">Multi-model analysis with granular control</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-background/50 rounded p-3">
              <Zap className="h-6 w-6 mb-2 text-yellow-500" />
              <p className="text-sm font-medium">Multiple AI Models</p>
              <p className="text-xs text-muted-foreground">Run simultaneous comparisons</p>
            </div>
            <div className="bg-background/50 rounded p-3">
              <BarChart3 className="h-6 w-6 mb-2 text-blue-500" />
              <p className="text-sm font-medium">Model Allocations</p>
              <p className="text-xs text-muted-foreground">Weight model influence</p>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground">
          Advanced Mode provides professional-grade tools for sophisticated media planning with multi-model ensemble predictions.
        </p>
      </div>
    ),
    highlights: ["Multi-model support", "Advanced allocations", "Professional tools"]
  },
  {
    title: "Multi-Model Selection",
    description: "Choose and configure multiple AI models simultaneously",
    content: (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-muted/30">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Select Models</h4>
            <Button variant="outline" className="w-[200px] justify-between">
              3 models selected
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 bg-background rounded">
              <div className="w-4 h-4 bg-green-500 rounded border-2 border-green-600"></div>
              <span className="text-sm font-medium">Predictify ROI Model</span>
              <Badge variant="secondary" className="ml-auto">Primary</Badge>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-background rounded">
              <div className="w-4 h-4 bg-green-500 rounded border-2 border-green-600"></div>
              <span className="text-sm font-medium">Predictify MMM</span>
              <Badge variant="outline" className="ml-auto">Secondary</Badge>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-background rounded">
              <div className="w-4 h-4 bg-green-500 rounded border-2 border-green-600"></div>
              <span className="text-sm font-medium">Attribution Model</span>
              <Badge variant="outline" className="ml-auto">Validation</Badge>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> Using multiple models provides more robust predictions by combining different algorithmic approaches.
        </p>
      </div>
    ),
    highlights: ["Checkbox selection", "Multiple models simultaneously", "Model roles and weighting"]
  },
  {
    title: "Model Allocations Matrix",
    description: "Fine-tune how each model influences monthly predictions",
    content: (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-muted/30">
          <h4 className="font-medium mb-4">Model Allocations (%)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Model</th>
                  <th className="text-center p-2">Jan</th>
                  <th className="text-center p-2">Feb</th>
                  <th className="text-center p-2">Mar</th>
                  <th className="text-center p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Predictify ROI</td>
                  <td className="text-center p-2">
                    <input className="w-16 text-center border rounded px-2 py-1 bg-blue-50" value="40" readOnly />
                  </td>
                  <td className="text-center p-2">
                    <input className="w-16 text-center border rounded px-2 py-1" value="35" />
                  </td>
                  <td className="text-center p-2">
                    <input className="w-16 text-center border rounded px-2 py-1" value="30" />
                  </td>
                  <td className="text-center p-2 font-medium">35%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Predictify MMM</td>
                  <td className="text-center p-2">
                    <input className="w-16 text-center border rounded px-2 py-1" value="35" />
                  </td>
                  <td className="text-center p-2">
                    <input className="w-16 text-center border rounded px-2 py-1 bg-blue-50" value="40" readOnly />
                  </td>
                  <td className="text-center p-2">
                    <input className="w-16 text-center border rounded px-2 py-1" value="35" />
                  </td>
                  <td className="text-center p-2 font-medium">37%</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Attribution Model</td>
                  <td className="text-center p-2">
                    <input className="w-16 text-center border rounded px-2 py-1" value="25" />
                  </td>
                  <td className="text-center p-2">
                    <input className="w-16 text-center border rounded px-2 py-1" value="25" />
                  </td>
                  <td className="text-center p-2">
                    <input className="w-16 text-center border rounded px-2 py-1 bg-blue-50" value="35" readOnly />
                  </td>
                  <td className="text-center p-2 font-medium">28%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            * Each column sums to 100%. Editing one cell automatically adjusts others in that month.
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> Higher allocations give more weight to that model's predictions. The Total column shows each model's overall influence.
        </p>
      </div>
    ),
    highlights: ["Percentage allocation system", "Auto-balancing columns", "Real-time total calculation"]
  },
  {
    title: "Advanced Settings Tables",
    description: "Configure channel constraints and optimization parameters",
    content: (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-muted/30">
          <h4 className="font-medium mb-4">Channel Constraints</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-3 text-sm">
              <div className="font-medium">Channel</div>
              <div className="font-medium text-center">Min Budget</div>
              <div className="font-medium text-center">Max Budget</div>
              <div className="font-medium text-center">Growth Rate</div>
            </div>
            <div className="grid grid-cols-4 gap-3 text-sm items-center">
              <div>Google Ads</div>
              <input className="text-center border rounded px-2 py-1 bg-background" value="$1,000" />
              <input className="text-center border rounded px-2 py-1 bg-background" value="$10,000" />
              <input className="text-center border rounded px-2 py-1 bg-background" value="10%" />
            </div>
            <div className="grid grid-cols-4 gap-3 text-sm items-center">
              <div>Facebook Ads</div>
              <input className="text-center border rounded px-2 py-1 bg-background" value="$500" />
              <input className="text-center border rounded px-2 py-1 bg-background" value="$8,000" />
              <input className="text-center border rounded px-2 py-1 bg-background" value="15%" />
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-4 bg-muted/30">
          <h4 className="font-medium mb-4">Optimization Parameters</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Target ROI</label>
              <input className="w-full border rounded px-3 py-2 mt-1 bg-background" value="250%" />
            </div>
            <div>
              <label className="text-sm font-medium">Risk Tolerance</label>
              <select className="w-full border rounded px-3 py-2 mt-1 bg-background">
                <option>Conservative</option>
                <option>Moderate</option>
                <option>Aggressive</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    ),
    highlights: ["Channel-specific constraints", "Budget min/max limits", "Optimization parameters"]
  },
  {
    title: "Advanced Results Analysis",
    description: "Comprehensive multi-model comparison and insights",
    content: (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-muted/30">
          <h4 className="font-medium mb-4">Model Performance Comparison</h4>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-background rounded p-3">
              <div className="text-sm font-medium text-green-600 mb-1">Predictify ROI</div>
              <div className="text-xl font-bold">+14.2%</div>
              <div className="text-xs text-muted-foreground">ROI Improvement</div>
            </div>
            <div className="bg-background rounded p-3">
              <div className="text-sm font-medium text-blue-600 mb-1">Predictify MMM</div>
              <div className="text-xl font-bold">+11.8%</div>
              <div className="text-xs text-muted-foreground">ROI Improvement</div>
            </div>
            <div className="bg-background rounded p-3">
              <div className="text-sm font-medium text-purple-600 mb-1">Attribution</div>
              <div className="text-xl font-bold">+9.3%</div>
              <div className="text-xs text-muted-foreground">ROI Improvement</div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded p-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">Ensemble Prediction: +12.4% ROI</span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              Weighted average based on your model allocations
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> The ensemble prediction combines all models based on your allocation percentages for more robust forecasting.
        </p>
      </div>
    ),
    highlights: ["Individual model results", "Ensemble predictions", "Confidence intervals"]
  }
];

const UserGuideView = () => {
  const [selectedMode, setSelectedMode] = useState<'standard' | 'advanced'>('standard');
  const [currentStep, setCurrentStep] = useState(0);
  
  const currentGuide = selectedMode === 'standard' ? standardGuideSteps : advancedGuideSteps;
  const totalSteps = currentGuide.length;
  
  const goToNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const resetGuide = (mode: 'standard' | 'advanced') => {
    setSelectedMode(mode);
    setCurrentStep(0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-predictify-purple" />
            <span>User Guide</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Step-by-step walkthrough of Predictify's features
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={selectedMode === 'standard' ? 'default' : 'outline'}>
            {selectedMode === 'standard' ? 'Standard Mode' : 'Advanced Mode'}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
      </div>

      {/* Mode Selection (shown only at the beginning) */}
      {currentStep === 0 && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className={`cursor-pointer transition-all ${selectedMode === 'standard' ? 'ring-2 ring-predictify-purple bg-predictify-purple/5' : 'hover:shadow-md'}`} 
                onClick={() => resetGuide('standard')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <span>Standard Mode</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Perfect for getting started with media planning basics
              </p>
              <ul className="text-sm space-y-1">
                <li>• Single model selection</li>
                <li>• Simple budget planning</li>
                <li>• Quick simulations</li>
                <li>• Essential insights</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer transition-all ${selectedMode === 'advanced' ? 'ring-2 ring-predictify-purple bg-predictify-purple/5' : 'hover:shadow-md'}`} 
                onClick={() => resetGuide('advanced')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-purple-500" />
                <span>Advanced Mode</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                For professional users who need sophisticated analysis
              </p>
              <ul className="text-sm space-y-1">
                <li>• Multiple AI models</li>
                <li>• Model allocations</li>
                <li>• Advanced constraints</li>
                <li>• Ensemble predictions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Guide Content */}
      <Card className="min-h-[500px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span className="bg-predictify-purple text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {currentStep + 1}
                </span>
                <span>{currentGuide[currentStep].title}</span>
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                {currentGuide[currentStep].description}
              </p>
            </div>
            {currentStep > 0 && (
              <Button variant="outline" size="sm" onClick={() => resetGuide(selectedMode)}>
                Switch Mode
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Main Content */}
          <div>
            {currentGuide[currentStep].content}
          </div>
          
          {/* Key Highlights */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span>Key Highlights</span>
            </h4>
            <ul className="space-y-2">
              {currentGuide[currentStep].highlights.map((highlight, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-predictify-purple rounded-full"></div>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={goToPrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentStep 
                  ? 'bg-predictify-purple' 
                  : index < currentStep 
                    ? 'bg-predictify-purple/50' 
                    : 'bg-muted'
              }`}
            />
          ))}
        </div>
        
        <Button 
          onClick={goToNext}
          disabled={currentStep === totalSteps - 1}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Completion Message */}
      {currentStep === totalSteps - 1 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-green-800">
                Congratulations! You've completed the {selectedMode} guide.
              </h3>
              <p className="text-green-700">
                You're now ready to create and optimize your media plans with Predictify.
              </p>
              <div className="flex justify-center space-x-3 mt-4">
                <Button onClick={() => resetGuide(selectedMode === 'standard' ? 'advanced' : 'standard')}>
                  Try {selectedMode === 'standard' ? 'Advanced' : 'Standard'} Mode
                </Button>
                <Button variant="outline" onClick={() => setCurrentStep(0)}>
                  Restart Guide
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserGuideView;
