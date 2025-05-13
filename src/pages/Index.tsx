
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import UploadPlanView from '@/components/views/UploadPlanView';
import GeneratePlanView from '@/components/views/GeneratePlanView';
import SimulationView from '@/components/views/SimulationView';
import LibraryView from '@/components/views/LibraryView';
import AutoGenerateView from '@/components/views/AutoGenerateView';

// Mock authentication logic - in a real app, this would be handled by an auth provider
const Index = () => {
  // In a real application, this would be determined by your auth system
  // For demo purposes, set to true to bypass login
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeView, setActiveView] = useState('autogenerate');
  const [isAdvancedMode, setIsAdvancedMode] = useState(true); // Set to true for testing advanced features

  // Render the appropriate view based on activeView state
  const renderView = () => {
    switch (activeView) {
      case 'upload':
        return <UploadPlanView />;
      case 'generate':
        return <GeneratePlanView />;
      case 'simulation':
        return <SimulationView isAdvancedMode={isAdvancedMode} />;
      case 'library':
        return <LibraryView />;
      case 'autogenerate':
        return <AutoGenerateView />;
      default:
        return <SimulationView isAdvancedMode={isAdvancedMode} />;
    }
  };

  return (
    <AppLayout>
      {renderView()}
    </AppLayout>
  );
};

export default Index;
