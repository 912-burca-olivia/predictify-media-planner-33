
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useMediaPlan } from '@/contexts/MediaPlanContext';

interface ModelAllocationsTableProps {
  selectedModels: string[];
}

const modelNames: Record<string, string> = {
  "predictify_roi": "Predictify ROI Model",
  "predictify_mmm": "Predictify MMM",
  "custom_model": "Custom Model",
  "attribution_model": "Attribution Model",
  "regression_model": "Regression Model"
};

const ModelAllocationsTable = ({ selectedModels }: ModelAllocationsTableProps) => {
  const { months } = useMediaPlan();
  const [allocations, setAllocations] = useState<Record<string, Record<string, number>>>({});

  // Initialize allocations when selected models change
  useEffect(() => {
    if (selectedModels.length === 0) return;

    const defaultAllocation = Math.round(100 / selectedModels.length);
    const newAllocations: Record<string, Record<string, number>> = {};

    selectedModels.forEach(modelId => {
      newAllocations[modelId] = {};
      months.forEach(month => {
        newAllocations[modelId][month.id] = defaultAllocation;
      });
    });

    // Adjust for rounding errors - make sure each month sums to 100
    months.forEach(month => {
      const monthSum = selectedModels.reduce((sum, modelId) => sum + newAllocations[modelId][month.id], 0);
      if (monthSum !== 100 && selectedModels.length > 0) {
        // Add the difference to the first model
        newAllocations[selectedModels[0]][month.id] += (100 - monthSum);
      }
    });

    setAllocations(newAllocations);
  }, [selectedModels, months]);

  const updateAllocation = (modelId: string, monthId: string, newValue: number) => {
    if (newValue < 0 || newValue > 100 || isNaN(newValue)) return;

    const otherModels = selectedModels.filter(id => id !== modelId);
    if (otherModels.length === 0) return;

    const remainingPercentage = 100 - newValue;
    const currentOtherTotal = otherModels.reduce((sum, id) => sum + (allocations[id]?.[monthId] || 0), 0);

    setAllocations(prev => {
      const newAllocations = { ...prev };
      
      // Update the changed model
      if (!newAllocations[modelId]) newAllocations[modelId] = {};
      newAllocations[modelId][monthId] = newValue;

      // Distribute remaining percentage proportionally among other models
      otherModels.forEach(id => {
        if (!newAllocations[id]) newAllocations[id] = {};
        const currentValue = prev[id]?.[monthId] || 0;
        const proportion = currentOtherTotal > 0 ? currentValue / currentOtherTotal : 1 / otherModels.length;
        newAllocations[id][monthId] = Math.round(remainingPercentage * proportion);
      });

      // Handle rounding errors
      const actualTotal = selectedModels.reduce((sum, id) => sum + newAllocations[id][monthId], 0);
      if (actualTotal !== 100 && otherModels.length > 0) {
        newAllocations[otherModels[0]][monthId] += (100 - actualTotal);
      }

      return newAllocations;
    });
  };

  const calculateTotalAllocation = (modelId: string) => {
    if (!allocations[modelId]) return 0;
    const total = months.reduce((sum, month) => sum + (allocations[modelId][month.id] || 0), 0);
    return Math.round(total / months.length);
  };

  if (selectedModels.length === 0) return null;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Model</TableHead>
            {months.map(month => (
              <TableHead key={month.id} className="text-center min-w-[80px]">
                {month.name}
              </TableHead>
            ))}
            <TableHead className="text-center">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedModels.map(modelId => (
            <TableRow key={modelId}>
              <TableCell className="font-medium">
                {modelNames[modelId] || modelId}
              </TableCell>
              {months.map(month => (
                <TableCell key={month.id} className="text-center">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={allocations[modelId]?.[month.id] || 0}
                    onChange={(e) => updateAllocation(modelId, month.id, parseInt(e.target.value) || 0)}
                    className="w-16 text-center mx-auto"
                  />
                </TableCell>
              ))}
              <TableCell className="text-center font-medium">
                {calculateTotalAllocation(modelId)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ModelAllocationsTable;
