
import AppLayout from '@/components/layout/AppLayout';
import SimulationView from '@/components/views/SimulationView';

const Index = () => {
  return (
    <AppLayout>
      <SimulationView isAdvancedMode={true} />
    </AppLayout>
  );
};

export default Index;
