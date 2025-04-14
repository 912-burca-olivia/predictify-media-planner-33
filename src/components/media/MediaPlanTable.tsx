
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Unlock, Edit, Download, Save, Percent, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import CellEditPopover from './CellEditPopover';
import { useMediaPlan } from '@/contexts/MediaPlanContext';

const MediaPlanTable = () => {
  const { channels, setChannels, months, setMonths, cellData, setCellData } = useMediaPlan();
  const [selectedCell, setSelectedCell] = useState<(typeof cellData)[0] | null>(null);
  
  const getCell = (channelId: string, monthId: string) => {
    return cellData.find(cell => cell.channelId === channelId && cell.monthId === monthId) || 
      { channelId, monthId, spend: 0, locked: false, priceIndex: 100, seasonalIndex: 100 };
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleCellClick = (cell: (typeof cellData)[0]) => {
    if (!cell.locked) {
      setSelectedCell(cell);
    }
  };

  const handleCellUpdate = (updatedCell: (typeof cellData)[0]) => {
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
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          {formatCurrency(cell.spend)}
                          {cell.locked && (
                            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                        </div>
                        
                        {/* Indicators for price and seasonal indices if they're not 100 */}
                        {(cell.priceIndex !== 100 || cell.seasonalIndex !== 100) && (
                          <div className="flex text-xs text-muted-foreground mt-1 gap-2">
                            {cell.priceIndex !== 100 && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center">
                                    <DollarSign className="h-3 w-3 mr-0.5" />
                                    <span>{cell.priceIndex}</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Price Index: {cell.priceIndex}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                            
                            {cell.seasonalIndex !== 100 && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center">
                                    <Percent className="h-3 w-3 mr-0.5" />
                                    <span>{cell.seasonalIndex}</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Seasonal Index: {cell.seasonalIndex}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        )}
                      </div>
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
