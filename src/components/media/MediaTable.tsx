
import { useState } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { useMediaTable } from '@/hooks/useMediaTable';
import { cn } from '@/lib/utils';
import { flexRender } from '@tanstack/react-table';
import CellEditPopover from './CellEditPopover';
import { CellData } from '@/contexts/MediaPlanContext';
import { Lock, MoreHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaPlan } from '@/contexts/MediaPlanContext';
import { toast } from "sonner";

interface MediaTableProps {
  isAdvancedMode: boolean;
}

export const MediaTable = ({ isAdvancedMode }: MediaTableProps) => {
  const { table, updateCell } = useMediaTable();
  const { channels, setChannels } = useMediaPlan();
  const [selectedCell, setSelectedCell] = useState<CellData | null>(null);
  const [isEditPopoverOpen, setIsEditPopoverOpen] = useState(false);
  
  const handleCellClick = (cell: any) => {
    // Ignore clicks on the channel column (first column)
    if (cell.column.id === 'channel') return;
    
    const cellData = {
      channelId: cell.row.original.channelId,
      monthId: cell.column.id,
      spend: cell.getValue() || 0,
      locked: cell.row.original.locked || false,
      priceIndex: cell.row.original.priceIndex || 100,
      seasonalIndex: cell.row.original.seasonalIndex || 100,
    };
    
    setSelectedCell(cellData);
    setIsEditPopoverOpen(true);
  };

  const handleCellUpdate = (updatedCell: CellData) => {
    updateCell(updatedCell);
    setIsEditPopoverOpen(false);
  };

  const handleClosePopover = () => {
    setIsEditPopoverOpen(false);
  };

  const handleChannelSettingsUpdate = (channelId: string, maxIncrease: number, maxDecrease: number) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, maxIncrease, maxDecrease } 
        : channel
    ));
    toast.success("Channel settings updated");
  };

  const getChannelSettingsById = (channelId: string) => {
    const channel = channels.find(c => c.id === channelId);
    return {
      maxIncrease: channel?.maxIncrease || 0,
      maxDecrease: channel?.maxDecrease || 0
    };
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className="text-right">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => {
                const isLocked = cell.column.id !== 'channel' && 
                  cell.row.original.locked;
                
                // Check if this is a channel cell (first column) in advanced mode
                const isChannelCell = cell.column.id === 'channel';
                
                return (
                <TableCell 
                  key={cell.id}
                  className={cn(
                    "text-right relative",
                    cell.column.id !== 'channel' && "data-cell data-cell-editable"
                  )}
                  onClick={isChannelCell ? undefined : () => handleCellClick(cell)}
                >
                  {/* Channel cell in advanced mode */}
                  {isChannelCell ? (
                    <div className="flex justify-between items-center">
                      <div className="text-left">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                      {isAdvancedMode && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80" align="start">
                            <div className="space-y-4">
                              <h4 className="font-medium leading-none">Channel Settings</h4>
                              <div className="space-y-2">
                                <Label htmlFor="max-increase">Maximum Allowed Increase (%)</Label>
                                <ChannelSettingInput
                                  id="max-increase"
                                  defaultValue={getChannelSettingsById(row.original.channelId).maxIncrease}
                                  onChange={(value) => {
                                    handleChannelSettingsUpdate(
                                      row.original.channelId,
                                      value,
                                      getChannelSettingsById(row.original.channelId).maxDecrease
                                    );
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="max-decrease">Maximum Allowed Decrease (%)</Label>
                                <ChannelSettingInput
                                  id="max-decrease"
                                  defaultValue={getChannelSettingsById(row.original.channelId).maxDecrease}
                                  onChange={(value) => {
                                    handleChannelSettingsUpdate(
                                      row.original.channelId,
                                      getChannelSettingsById(row.original.channelId).maxIncrease,
                                      value
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  ) : (
                    <>
                      {isLocked && (
                        <span className="absolute left-1 top-1/2 -translate-y-1/2">
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        </span>
                      )}
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </>
                  )}
                </TableCell>
              )})}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedCell && isEditPopoverOpen && (
        <CellEditPopover 
          cell={selectedCell}
          onUpdate={handleCellUpdate}
          onClose={handleClosePopover}
        />
      )}
    </div>
  );
};

// Helper component for channel settings inputs
const ChannelSettingInput = ({ 
  id, 
  defaultValue, 
  onChange 
}: { 
  id: string; 
  defaultValue: number; 
  onChange: (value: number) => void 
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="flex items-center space-x-2">
      <Input
        id={id}
        type="number"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value, 10) || 0)}
        onBlur={() => onChange(value)}
        className="w-full"
      />
      <span className="text-sm text-muted-foreground">%</span>
    </div>
  );
};
