
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, BookOpen, Settings, Zap, BarChart3, Sparkles } from 'lucide-react';

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
        <img 
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop" 
          alt="Predictify Dashboard Overview"
          className="w-full rounded-lg border shadow-sm"
        />
        <p className="text-muted-foreground">
          Predictify helps you optimize your media spend using advanced AI models. This guide will walk you through the Standard workflow.
        </p>
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> The main dashboard gives you access to all media planning tools in one place.
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
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop" 
          alt="Media Plan Budget Configuration"
          className="w-full rounded-lg border shadow-sm"
        />
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
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop" 
          alt="AI Model Selection Interface"
          className="w-full rounded-lg border shadow-sm"
        />
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
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop" 
          alt="Simulation Running Progress"
          className="w-full rounded-lg border shadow-sm"
        />
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> Simulations typically complete within 30-60 seconds depending on the complexity of your media plan.
        </p>
      </div>
    ),
    highlights: ["One-click simulation", "Real-time progress tracking", "Clear ROI improvements"]
  },
  {
    title: "Understanding Your Results",
    description: "Analyze the simulation outcomes and recommendations",
    content: (
      <div className="space-y-4">
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop" 
          alt="Results Dashboard with Charts"
          className="w-full rounded-lg border shadow-sm"
        />
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
        <img 
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop" 
          alt="Advanced Mode Dashboard"
          className="w-full rounded-lg border shadow-sm"
        />
        <p className="text-muted-foreground">
          Advanced Mode provides professional-grade tools for sophisticated media planning with multi-model ensemble predictions.
        </p>
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> Switch to Advanced Mode when you need more granular control over your simulations.
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
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop" 
          alt="Multi-Model Selection Interface"
          className="w-full rounded-lg border shadow-sm"
        />
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
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop" 
          alt="Model Allocations Matrix"
          className="w-full rounded-lg border shadow-sm"
        />
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
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop" 
          alt="Advanced Settings Configuration"
          className="w-full rounded-lg border shadow-sm"
        />
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> Set budget constraints per channel to ensure realistic optimization within your business limits.
        </p>
      </div>
    ),
    highlights: ["Channel-specific constraints", "Budget min/max limits", "Optimization parameters"]
  },
  {
    title: "Advanced Results Analysis",
    description: "Comprehensive multi-model comparison and insights",
    content: (
      <div className="space-y-4">
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop" 
          alt="Advanced Results Dashboard"
          className="w-full rounded-lg border shadow-sm"
        />
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
