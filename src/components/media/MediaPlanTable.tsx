
import { Button } from '@/components/ui/button';
import { DollarSign, Percent } from 'lucide-react';
import { MediaTable } from './MediaTable';

interface MediaPlanTableProps {
  isAdvancedMode: boolean;
}

const MediaPlanTable = ({ isAdvancedMode }: MediaPlanTableProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Media Plan Table</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <DollarSign className="h-4 w-4 mr-1" /> Copy
          </Button>
          <Button variant="outline" size="sm">
            <Percent className="h-4 w-4 mr-1" /> Paste
          </Button>
        </div>
      </div>
      
      <MediaTable isAdvancedMode={isAdvancedMode} />
    </div>
  );
};

export default MediaPlanTable;
