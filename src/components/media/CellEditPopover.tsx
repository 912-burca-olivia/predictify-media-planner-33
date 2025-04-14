
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Lock, Unlock, DollarSign, Percent } from 'lucide-react';

// Cell data type matching the parent component
type CellData = {
  channelId: string;
  monthId: string;
  spend: number;
  locked: boolean;
  priceIndex: number;
  seasonalIndex: number;
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

  const handlePriceIndexChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setEditedCell({
      ...editedCell,
      priceIndex: numericValue ? parseInt(numericValue, 10) : 100
    });
  };

  const handleSeasonalIndexChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setEditedCell({
      ...editedCell,
      seasonalIndex: numericValue ? parseInt(numericValue, 10) : 100
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
          
          <div className="grid gap-2">
            <Label htmlFor="price-index">Price Index</Label>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input
                id="price-index"
                type="text"
                value={editedCell.priceIndex}
                onChange={(e) => handlePriceIndexChange(e.target.value)}
                className="col-span-3"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Base is 100. Higher values mean more expensive.
            </p>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="seasonal-index">Seasonal Index</Label>
            <div className="flex items-center">
              <Percent className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input
                id="seasonal-index"
                type="text"
                value={editedCell.seasonalIndex}
                onChange={(e) => handleSeasonalIndexChange(e.target.value)}
                className="col-span-3"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Base is 100. Higher values indicate stronger seasonality.
            </p>
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
