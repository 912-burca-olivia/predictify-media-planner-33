import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DynamicDataSheetGrid, Column } from 'react-datasheet-grid';
import * as XLSX from 'xlsx';
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

interface SheetData {
  name: string;
  data: RowData[];
  columns: Column<RowData>[];
}

export const EditModelDialog = ({ open, onOpenChange, model }: EditModelDialogProps) => {
  const { toast } = useToast();
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [activeSheet, setActiveSheet] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual data fetching
  useEffect(() => {
    if (model && open) {
      // Create mock multi-sheet data
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

      const mockSheets: SheetData[] = [
        {
          name: 'Q1 Media Plan',
          data: [
            { id: '1', channel: 'TV', budget: 50000, reach: 1000000, cpm: 5.0 },
            { id: '2', channel: 'Digital', budget: 30000, reach: 750000, cpm: 4.0 },
          ],
          columns: mockColumns,
        },
        {
          name: 'Q2 Media Plan',
          data: [
            { id: '1', channel: 'Radio', budget: 15000, reach: 500000, cpm: 3.0 },
            { id: '2', channel: 'Print', budget: 10000, reach: 200000, cpm: 5.0 },
          ],
          columns: mockColumns,
        },
        {
          name: 'Budget Summary',
          data: [
            { id: '1', quarter: 'Q1', total_budget: 80000, total_reach: 1750000 },
            { id: '2', quarter: 'Q2', total_budget: 25000, total_reach: 700000 },
          ],
          columns: [
            {
              component: ({ rowData, setRowData }) => (
                <input
                  className="w-full p-1 border-0 bg-transparent outline-none"
                  value={rowData.quarter || ''}
                  onChange={(e) => setRowData({ ...rowData, quarter: e.target.value })}
                />
              ),
              title: 'Quarter',
              basis: 120,
            },
            {
              component: ({ rowData, setRowData }) => (
                <input
                  type="number"
                  className="w-full p-1 border-0 bg-transparent outline-none text-right"
                  value={rowData.total_budget || ''}
                  onChange={(e) => setRowData({ ...rowData, total_budget: parseFloat(e.target.value) || 0 })}
                />
              ),
              title: 'Total Budget ($)',
              basis: 150,
            },
            {
              component: ({ rowData, setRowData }) => (
                <input
                  type="number"
                  className="w-full p-1 border-0 bg-transparent outline-none text-right"
                  value={rowData.total_reach || ''}
                  onChange={(e) => setRowData({ ...rowData, total_reach: parseInt(e.target.value) || 0 })}
                />
              ),
              title: 'Total Reach',
              basis: 150,
            },
          ],
        },
      ];

      setSheets(mockSheets);
      setActiveSheet(mockSheets[0]?.name || '');
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

  const currentSheet = sheets.find(sheet => sheet.name === activeSheet);

  const addSheet = () => {
    const sheetName = `Sheet ${sheets.length + 1}`;
    const newSheet: SheetData = {
      name: sheetName,
      data: [{ id: '1' }],
      columns: [
        {
          component: ({ rowData, setRowData }) => (
            <input
              className="w-full p-1 border-0 bg-transparent outline-none"
              value={rowData.column1 || ''}
              onChange={(e) => setRowData({ ...rowData, column1: e.target.value })}
            />
          ),
          title: 'Column 1',
          basis: 120,
        },
      ],
    };
    setSheets(prev => [...prev, newSheet]);
    setActiveSheet(sheetName);
  };

  const addColumn = () => {
    if (!currentSheet) return;
    
    const columnCount = currentSheet.columns.length;
    const newColumnKey = `column${columnCount + 1}`;
    const newColumn: Column<RowData> = {
      component: ({ rowData, setRowData }) => (
        <input
          className="w-full p-1 border-0 bg-transparent outline-none"
          value={rowData[newColumnKey] || ''}
          onChange={(e) => setRowData({ ...rowData, [newColumnKey]: e.target.value })}
        />
      ),
      title: `Column ${columnCount + 1}`,
      basis: 120,
    };

    setSheets(prev => prev.map(sheet => 
      sheet.name === activeSheet 
        ? { 
            ...sheet, 
            columns: [...sheet.columns, newColumn],
            data: sheet.data.map(row => ({ ...row, [newColumnKey]: '' }))
          }
        : sheet
    ));
  };

  const addRow = () => {
    if (!currentSheet) return;
    
    const newRow: RowData = {
      id: Date.now().toString(),
    };
    
    setSheets(prev => prev.map(sheet => 
      sheet.name === activeSheet 
        ? { ...sheet, data: [...sheet.data, newRow] }
        : sheet
    ));
  };

  const updateSheetData = (newData: RowData[]) => {
    setSheets(prev => prev.map(sheet => 
      sheet.name === activeSheet 
        ? { ...sheet, data: newData }
        : sheet
    ));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        
        const newSheets: SheetData[] = workbook.SheetNames.map(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          if (jsonData.length === 0) return null;
          
          const headers = jsonData[0] as string[];
          const rows = jsonData.slice(1) as any[][];
          
          const columns: Column<RowData>[] = headers.map(header => ({
            component: ({ rowData, setRowData }) => (
              <input
                className="w-full p-1 border-0 bg-transparent outline-none"
                value={rowData[header] || ''}
                onChange={(e) => setRowData({ ...rowData, [header]: e.target.value })}
              />
            ),
            title: header,
            basis: 120,
          }));
          
          const data: RowData[] = rows.map((row, index) => {
            const rowData: RowData = { id: index.toString() };
            headers.forEach((header, colIndex) => {
              rowData[header] = row[colIndex] || '';
            });
            return rowData;
          });
          
          return {
            name: sheetName,
            data,
            columns,
          };
        }).filter(Boolean) as SheetData[];
        
        if (newSheets.length > 0) {
          setSheets(newSheets);
          setActiveSheet(newSheets[0].name);
          toast({
            title: "File Uploaded",
            description: `Loaded ${newSheets.length} sheet(s) from Excel file.`,
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to parse Excel file. Please check the file format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsBinaryString(file);
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
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="excel-upload"
              />
              <label htmlFor="excel-upload">
                <Button variant="outline" size="sm" asChild>
                  <span>Upload Excel</span>
                </Button>
              </label>
              <Button variant="outline" size="sm" onClick={addSheet}>
                Add Sheet
              </Button>
              <Button variant="outline" size="sm" onClick={addColumn}>
                Add Column
              </Button>
              <Button variant="outline" size="sm" onClick={addRow}>
                Add Row
              </Button>
            </div>
          </div>

          {sheets.length > 0 && (
            <Tabs value={activeSheet} onValueChange={setActiveSheet} className="flex-1 min-h-0 flex flex-col">
              <div className="overflow-x-auto">
                <TabsList className="flex w-max min-w-full">
                  {sheets.map((sheet) => (
                    <TabsTrigger key={sheet.name} value={sheet.name} className="text-xs whitespace-nowrap">
                      {sheet.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {sheets.map((sheet) => (
                <TabsContent key={sheet.name} value={sheet.name} className="flex-1 min-h-0 mt-4">
                  <div className="flex-1 min-h-0 border rounded-md overflow-hidden bg-background">
                    <DynamicDataSheetGrid
                      value={sheet.data}
                      onChange={updateSheetData}
                      columns={sheet.columns}
                      height={400}
                      addRowsComponent={false}
                      rowClassName={() => "hover:bg-muted/50"}
                      headerRowHeight={40}
                      rowHeight={36}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}

          <div className="flex justify-between">
            <div className="text-xs text-muted-foreground">
              {currentSheet ? `${currentSheet.data.length} rows` : '0 rows'} • Use Ctrl+C/Ctrl+V to copy/paste from Excel
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