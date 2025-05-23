
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Save, RefreshCw } from 'lucide-react';
import { useMediaPlan } from '@/contexts/MediaPlanContext';
import { toast } from 'sonner';

const AdvancedSettingsTables = () => {
  const { channels, setChannels, months, cellData, setCellData } = useMediaPlan();
  const [localCellData, setLocalCellData] = useState([...cellData]);
  const [localChannels, setLocalChannels] = useState([...channels]);

  // Update local cell data when context data changes
  useEffect(() => {
    setLocalCellData([...cellData]);
    setLocalChannels([...channels]);
  }, [cellData, channels]);

  const handleLockChange = (channelId: string, monthId: string, checked: boolean) => {
    setLocalCellData(prevData =>
      prevData.map(cell =>
        cell.channelId === channelId && cell.monthId === monthId
          ? { ...cell, locked: checked }
          : cell
      )
    );
  };

  const handlePriceIndexChange = (channelId: string, monthId: string, value: string) => {
    const numValue = parseInt(value, 10) || 100;
    
    setLocalCellData(prevData =>
      prevData.map(cell =>
        cell.channelId === channelId && cell.monthId === monthId
          ? { ...cell, priceIndex: numValue }
          : cell
      )
    );
  };

  const handleSeasonalIndexChange = (channelId: string, monthId: string, value: string) => {
    const numValue = parseInt(value, 10) || 100;
    
    setLocalCellData(prevData =>
      prevData.map(cell =>
        cell.channelId === channelId && cell.monthId === monthId
          ? { ...cell, seasonalIndex: numValue }
          : cell
      )
    );
  };

  const handleMaxIncreaseChange = (channelId: string, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    
    setLocalChannels(prevData =>
      prevData.map(channel =>
        channel.id === channelId
          ? { ...channel, maxIncrease: numValue }
          : channel
      )
    );
  };

  const handleMaxDecreaseChange = (channelId: string, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    
    setLocalChannels(prevData =>
      prevData.map(channel =>
        channel.id === channelId
          ? { ...channel, maxDecrease: numValue }
          : channel
      )
    );
  };

  const saveChanges = () => {
    setCellData(localCellData);
    setChannels(localChannels);
    toast.success('Advanced settings saved successfully');
  };

  const resetChanges = () => {
    setLocalCellData([...cellData]);
    setLocalChannels([...channels]);
    toast.info('Changes reset to current values');
  };

  const getCellValue = (channelId: string, monthId: string, property: keyof typeof localCellData[0]) => {
    const cell = localCellData.find(cell => 
      cell.channelId === channelId && cell.monthId === monthId
    );
    return cell ? cell[property] : null;
  };

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Advanced Settings</CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetChanges}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button 
              size="sm" 
              onClick={saveChanges}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="locks" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="locks">Cell Locks</TabsTrigger>
            <TabsTrigger value="price">Price Index</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal Index</TabsTrigger>
            <TabsTrigger value="limits">Channel Limits</TabsTrigger>
          </TabsList>
          
          {/* Cell Locks Table */}
          <TabsContent value="locks" className="space-y-4">
            <div className="editable-table-wrapper">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="table-header sticky left-0 z-10 bg-card">Channel</th>
                    {months.map(month => (
                      <th key={month.id} className="table-header min-w-[100px]">
                        {month.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {channels.map(channel => (
                    <tr key={channel.id}>
                      <td className="table-header sticky left-0 z-10 bg-card">
                        {channel.name}
                      </td>
                      {months.map(month => (
                        <td 
                          key={`${channel.id}-${month.id}`}
                          className="data-cell text-center"
                        >
                          <Checkbox 
                            checked={Boolean(getCellValue(channel.id, month.id, 'locked'))}
                            onCheckedChange={(checked) => 
                              handleLockChange(channel.id, month.id, !!checked)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          {/* Price Index Table */}
          <TabsContent value="price" className="space-y-4">
            <div className="editable-table-wrapper">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="table-header sticky left-0 z-10 bg-card">Channel</th>
                    {months.map(month => (
                      <th key={month.id} className="table-header min-w-[100px]">
                        {month.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {channels.map(channel => (
                    <tr key={channel.id}>
                      <td className="table-header sticky left-0 z-10 bg-card">
                        {channel.name}
                      </td>
                      {months.map(month => (
                        <td 
                          key={`${channel.id}-${month.id}`}
                          className="data-cell"
                        >
                          <Input
                            type="number"
                            min="1"
                            value={String(getCellValue(channel.id, month.id, 'priceIndex'))}
                            onChange={(e) => handlePriceIndexChange(channel.id, month.id, e.target.value)}
                            className="h-8 w-full text-center"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-sm">
              Price index is based on 100 as default. A value of 110 means prices are 10% higher than the baseline.
            </p>
          </TabsContent>
          
          {/* Seasonal Index Table */}
          <TabsContent value="seasonal" className="space-y-4">
            <div className="editable-table-wrapper">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="table-header sticky left-0 z-10 bg-card">Channel</th>
                    {months.map(month => (
                      <th key={month.id} className="table-header min-w-[100px]">
                        {month.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {channels.map(channel => (
                    <tr key={channel.id}>
                      <td className="table-header sticky left-0 z-10 bg-card">
                        {channel.name}
                      </td>
                      {months.map(month => (
                        <td 
                          key={`${channel.id}-${month.id}`}
                          className="data-cell"
                        >
                          <Input
                            type="number"
                            min="1"
                            value={String(getCellValue(channel.id, month.id, 'seasonalIndex'))}
                            onChange={(e) => handleSeasonalIndexChange(channel.id, month.id, e.target.value)}
                            className="h-8 w-full text-center"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-sm">
              Seasonal index is based on 100 as default. A value of 120 means this month has 20% more seasonal impact.
            </p>
          </TabsContent>
          
          {/* Channel Limits Table - New */}
          <TabsContent value="limits" className="space-y-4">
            <div className="editable-table-wrapper">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="table-header sticky left-0 z-10 bg-card">Channel</th>
                    <th className="table-header">Maximum Allowed Increase (%)</th>
                    <th className="table-header">Maximum Allowed Decrease (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {localChannels.map(channel => (
                    <tr key={channel.id}>
                      <td className="table-header sticky left-0 z-10 bg-card">
                        {channel.name}
                      </td>
                      <td className="data-cell">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={String(channel.maxIncrease || 0)}
                          onChange={(e) => handleMaxIncreaseChange(channel.id, e.target.value)}
                          className="h-8 w-full text-center"
                        />
                      </td>
                      <td className="data-cell">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={String(channel.maxDecrease || 0)}
                          onChange={(e) => handleMaxDecreaseChange(channel.id, e.target.value)}
                          className="h-8 w-full text-center"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-sm">
              These values define the maximum percentage a channel's budget can increase or decrease during optimization.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedSettingsTables;
