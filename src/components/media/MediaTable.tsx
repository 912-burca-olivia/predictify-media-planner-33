
import { useState } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { useMediaTable } from '@/hooks/useMediaTable';
import { cn } from '@/lib/utils';
import { flexRender } from '@tanstack/react-table';
import CellEditPopover from './CellEditPopover';
import { CellData } from '@/contexts/MediaPlanContext';
import { Lock } from 'lucide-react';

export const MediaTable = () => {
  const { table, updateCell } = useMediaTable();
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
                
                return (
                <TableCell 
                  key={cell.id}
                  className={cn(
                    "text-right relative",
                    cell.column.id !== 'channel' && "data-cell data-cell-editable"
                  )}
                  onClick={() => handleCellClick(cell)}
                >
                  {isLocked && (
                    <span className="absolute left-1 top-1/2 -translate-y-1/2">
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    </span>
                  )}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
