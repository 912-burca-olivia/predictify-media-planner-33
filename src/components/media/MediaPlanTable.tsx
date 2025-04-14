
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Unlock, Edit, Download, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import CellEditPopover from './CellEditPopover';

// Sample data structure
type MediaChannel = {
  id: string;
  name: string;
  locked: boolean;
};

type MonthData = {
  id: string;
  name: string;
  locked: boolean;
};

type CellData = {
  channelId: string;
  monthId: string;
  spend: number;
  locked: boolean;
};

const MediaPlanTable = () => {
  // Sample data (would come from API/context in a real app)
  const [channels, setChannels] = useState<MediaChannel[]>([
    { id: 'tv', name: 'TV', locked: false },
    { id: 'radio', name: 'Radio', locked: false },
    { id: 'social', name: 'Social Media', locked: false },
    { id: 'search', name: 'Search', locked: false },
    { id: 'display', name: 'Display', locked: false },
    { id: 'print', name: 'Print', locked: false },
  ]);

  const [months, setMonths] = useState<MonthData[]>([
    { id: 'jan', name: 'Jan', locked: false },
    { id: 'feb', name: 'Feb', locked: false },
    { id: 'mar', name: 'Mar', locked: false },
    { id: 'apr', name: 'Apr', locked: false },
    { id: 'may', name: 'May', locked: false },
    { id: 'jun', name: 'Jun', locked: false },
    { id: 'jul', name: 'Jul', locked: false },
    { id: 'aug', name: 'Aug', locked: false },
    { id: 'sep', name: 'Sep', locked: false },
    { id: 'oct', name: 'Oct', locked: false },
    { id: 'nov', name: 'Nov', locked: false },
    { id: 'dec', name: 'Dec', locked: false },
  ]);

  // Generate some sample cell data
  const generateInitialCellData = (): CellData[] => {
    const cells: CellData[] = [];
    channels.forEach(channel => {
      months.forEach(month => {
        cells.push({
          channelId: channel.id,
          monthId: month.id,
          spend: Math.floor(Math.random() * 100000),
          locked: false
        });
      });
    });
    return cells;
  };

  const [cellData, setCellData] = useState<CellData[]>(generateInitialCellData());
  const [selectedCell, setSelectedCell] = useState<CellData | null>(null);
  
  const getCell = (channelId: string, monthId: string): CellData => {
    return cellData.find(cell => cell.channelId === channelId && cell.monthId === monthId) || 
      { channelId, monthId, spend: 0, locked: false };
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleCellClick = (cell: CellData) => {
    if (!cell.locked) {
      setSelectedCell(cell);
    }
  };

  const handleCellUpdate = (updatedCell: CellData) => {
    setCellData(prevData => 
      prevData.map(cell => 
        cell.channelId === updatedCell.channelId && cell.monthId === updatedCell.monthId
          ? updatedCell
          : cell
      )
    );
    setSelectedCell(null);
  };

  const toggleChannelLock = (channelId: string) => {
    const channel = channels.find(c => c.id === channelId);
    if (!channel) return;
    
    const newLockStatus = !channel.locked;
    
    // Update channel lock status
    setChannels(prevChannels =>
      prevChannels.map(c => 
        c.id === channelId ? { ...c, locked: newLockStatus } : c
      )
    );
    
    // Update all cells for this channel
    setCellData(prevData =>
      prevData.map(cell =>
        cell.channelId === channelId ? { ...cell, locked: newLockStatus } : cell
      )
    );
  };

  const toggleMonthLock = (monthId: string) => {
    const month = months.find(m => m.id === monthId);
    if (!month) return;
    
    const newLockStatus = !month.locked;
    
    // Update month lock status
    setMonths(prevMonths =>
      prevMonths.map(m => 
        m.id === monthId ? { ...m, locked: newLockStatus } : m
      )
    );
    
    // Update all cells for this month
    setCellData(prevData =>
      prevData.map(cell =>
        cell.monthId === monthId ? { ...cell, locked: newLockStatus } : cell
      )
    );
  };

  // Calculate totals for each column and row
  const calculateChannelTotal = (channelId: string): number => {
    return cellData
      .filter(cell => cell.channelId === channelId)
      .reduce((sum, cell) => sum + cell.spend, 0);
  };

  const calculateMonthTotal = (monthId: string): number => {
    return cellData
      .filter(cell => cell.monthId === monthId)
      .reduce((sum, cell) => sum + cell.spend, 0);
  };

  const calculateGrandTotal = (): number => {
    return cellData.reduce((sum, cell) => sum + cell.spend, 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Media Plan Table</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-1" /> Save Plan
          </Button>
        </div>
      </div>
      
      <div className="editable-table-wrapper">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="table-header sticky left-0 z-10 bg-card">Channel</th>
              {months.map(month => (
                <th key={month.id} className="table-header min-w-[100px]">
                  <div className="flex items-center justify-between">
                    <span>{month.name}</span>
                    <button 
                      onClick={() => toggleMonthLock(month.id)}
                      className="ml-1 p-0.5 text-muted-foreground hover:text-foreground"
                    >
                      {month.locked ? (
                        <Lock className="h-3.5 w-3.5" />
                      ) : (
                        <Unlock className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </th>
              ))}
              <th className="table-header">Total</th>
            </tr>
          </thead>
          <tbody>
            {channels.map(channel => (
              <tr key={channel.id}>
                <td className="table-header sticky left-0 z-10 bg-card flex items-center justify-between">
                  <span>{channel.name}</span>
                  <button 
                    onClick={() => toggleChannelLock(channel.id)}
                    className="ml-1 p-0.5 text-muted-foreground hover:text-foreground"
                  >
                    {channel.locked ? (
                      <Lock className="h-3.5 w-3.5" />
                    ) : (
                      <Unlock className="h-3.5 w-3.5" />
                    )}
                  </button>
                </td>
                {months.map(month => {
                  const cell = getCell(channel.id, month.id);
                  return (
                    <td 
                      key={`${channel.id}-${month.id}`}
                      className={cn(
                        "data-cell",
                        cell.locked && "data-cell-locked",
                        !cell.locked && "data-cell-editable"
                      )}
                      onClick={() => handleCellClick(cell)}
                    >
                      {formatCurrency(cell.spend)}
                    </td>
                  );
                })}
                <td className="table-header text-right font-semibold">
                  {formatCurrency(calculateChannelTotal(channel.id))}
                </td>
              </tr>
            ))}
            <tr className="bg-muted/30">
              <td className="table-header sticky left-0 z-10 bg-card/90 font-semibold">Total</td>
              {months.map(month => (
                <td key={`total-${month.id}`} className="table-header text-right font-semibold">
                  {formatCurrency(calculateMonthTotal(month.id))}
                </td>
              ))}
              <td className="table-header text-right font-semibold">
                {formatCurrency(calculateGrandTotal())}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Cell edit popover */}
      {selectedCell && (
        <CellEditPopover 
          cell={selectedCell} 
          onUpdate={handleCellUpdate} 
          onClose={() => setSelectedCell(null)} 
        />
      )}
    </div>
  );
};

export default MediaPlanTable;
