
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Lock, Unlock } from 'lucide-react';

// Cell data type matching the parent component
type CellData = {
  channelId: string;
  monthId: string;
  spend: number;
  locked: boolean;
};

interface CellEditPopoverProps {
  cell: CellData;
  onUpdate: (cell: CellData) => void;
  onClose: () => void;
}

const CellEditPopover = ({ cell, onUpdate, onClose }: CellEditPopoverProps) => {
  const [editedCell, setEditedCell] = useState<CellData>({ ...cell });

  const handleSpendChange = (value: string) => {
    // Remove non-numeric characters and convert to number
    const numericValue = value.replace(/[^0-9]/g, '');
    setEditedCell({
      ...editedCell,
      spend: numericValue ? parseInt(numericValue, 10) : 0
    });
  };

  const handleSubmit = () => {
    onUpdate(editedCell);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Cell Value</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="spend">Spend Amount</Label>
            <Input
              id="spend"
              type="text"
              value={editedCell.spend.toLocaleString()}
              onChange={(e) => handleSpendChange(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="lock-cell">Lock Cell</Label>
            <Switch
              id="lock-cell"
              checked={editedCell.locked}
              onCheckedChange={(checked) => 
                setEditedCell({ ...editedCell, locked: checked })
              }
            />
          </div>
          
          {/* Additional controls could be added here for season index, price index, etc. */}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CellEditPopover;
