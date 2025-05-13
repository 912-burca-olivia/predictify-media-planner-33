
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SimulationView from '@/components/views/SimulationView';

const Index = () => {
  // In a real application, this would be determined by your auth system
  // For demo purposes, set to true to bypass login
  const [isAdvancedMode, setIsAdvancedMode] = useState(true); // Set to true for testing advanced features

  return (
    <AppLayout>
      <SimulationView isAdvancedMode={isAdvancedMode} />
    </AppLayout>
  );
};

export default Index;
