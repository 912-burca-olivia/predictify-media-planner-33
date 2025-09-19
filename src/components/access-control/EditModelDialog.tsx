import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { DynamicDataSheetGrid, Column } from 'react-datasheet-grid';
import 'react-datasheet-grid/dist/style.css';

interface EditModelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  model: {
    id: string;
    name: string;
    market: string;
    organization: string | null;
  } | null;
}

interface RowData {
  id?: string;
  [key: string]: any;
}

export const EditModelDialog = ({ open, onOpenChange, model }: EditModelDialogProps) => {
  const { toast } = useToast();
  const [data, setData] = useState<RowData[]>([]);
  const [columns, setColumns] = useState<Column<RowData>[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual data fetching
  useEffect(() => {
    if (model && open) {
      // Simulate loading model data
      const mockData = [
        { id: '1', channel: 'TV', budget: 50000, reach: 1000000, cpm: 5.0 },
        { id: '2', channel: 'Digital', budget: 30000, reach: 750000, cpm: 4.0 },
        { id: '3', channel: 'Radio', budget: 15000, reach: 500000, cpm: 3.0 },
        { id: '4', channel: 'Print', budget: 10000, reach: 200000, cpm: 5.0 },
      ];

      const mockColumns: Column<RowData>[] = [
        {
          component: ({ rowData, setRowData }) => (
            <input
              className="w-full p-1 border-0 bg-transparent outline-none"
              value={rowData.channel || ''}
              onChange={(e) => setRowData({ ...rowData, channel: e.target.value })}
            />
          ),
          title: 'Channel',
          basis: 120,
        },
        {
          component: ({ rowData, setRowData }) => (
            <input
              type="number"
              className="w-full p-1 border-0 bg-transparent outline-none text-right"
              value={rowData.budget || ''}
              onChange={(e) => setRowData({ ...rowData, budget: parseFloat(e.target.value) || 0 })}
            />
          ),
          title: 'Budget ($)',
          basis: 120,
        },
        {
          component: ({ rowData, setRowData }) => (
            <input
              type="number"
              className="w-full p-1 border-0 bg-transparent outline-none text-right"
              value={rowData.reach || ''}
              onChange={(e) => setRowData({ ...rowData, reach: parseInt(e.target.value) || 0 })}
            />
          ),
          title: 'Reach',
          basis: 120,
        },
        {
          component: ({ rowData, setRowData }) => (
            <input
              type="number"
              step="0.1"
              className="w-full p-1 border-0 bg-transparent outline-none text-right"
              value={rowData.cpm || ''}
              onChange={(e) => setRowData({ ...rowData, cpm: parseFloat(e.target.value) || 0 })}
            />
          ),
          title: 'CPM ($)',
          basis: 100,
        },
      ];

      setData(mockData);
      setColumns(mockColumns);
    }
  }, [model, open]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Model Updated",
        description: `${model?.name} has been successfully updated.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the model. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addRow = () => {
    const newRow: RowData = {
      id: Date.now().toString(),
      channel: '',
      budget: 0,
      reach: 0,
      cpm: 0,
    };
    setData(prev => [...prev, newRow]);
  };

  const deleteRow = (rowIndex: number) => {
    setData(prev => prev.filter((_, index) => index !== rowIndex));
  };

  if (!model) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Model: {model.name}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0 space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Market: {model.market} | Organization: {model.organization || 'Unassigned'}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={addRow}>
                Add Row
              </Button>
            </div>
          </div>

          <div className="flex-1 min-h-0 border rounded-md overflow-hidden bg-background">
            <DynamicDataSheetGrid
              value={data}
              onChange={setData}
              columns={columns}
              height={400}
              addRowsComponent={false}
              rowClassName={() => "hover:bg-muted/50"}
              headerRowHeight={40}
              rowHeight={36}
            />
          </div>

          <div className="flex justify-between">
            <div className="text-xs text-muted-foreground">
              {data.length} rows • Use Ctrl+C/Ctrl+V to copy/paste from Excel
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};