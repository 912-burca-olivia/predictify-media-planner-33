import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  createColumnHelper,
  ColumnDef,
} from '@tanstack/react-table';
import * as XLSX from 'xlsx';
import { SheetTable } from '@/components/media/SheetTable';

interface RowData {
  id?: string;
  [key: string]: any;
}

interface SheetData {
  name: string;
  data: RowData[];
  columns: ColumnDef<RowData>[];
}

export default function EditModel() {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [activeSheet, setActiveSheet] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState<any>(null);

  // Mock data - replace with actual data fetching
  useEffect(() => {
    // Simulate loading model data
    const mockModel = {
      id: modelId,
      name: `Model ${modelId}`,
      market: 'US',
      organization: 'Acme Corp',
    };
    setModel(mockModel);

    // Create mock multi-sheet data
    const mockColumns: ColumnDef<RowData>[] = [
      {
        accessorKey: 'channel',
        header: 'Channel',
        cell: ({ row, column }) => (
          <Input
            value={row.original.channel || ''}
            onChange={(e) => handleCellEdit(row.index, column.id, e.target.value)}
            className="border-0 h-8 px-2"
          />
        ),
      },
      {
        accessorKey: 'budget',
        header: 'Budget ($)',
        cell: ({ row, column }) => (
          <Input
            type="number"
            value={row.original.budget || ''}
            onChange={(e) => handleCellEdit(row.index, column.id, parseFloat(e.target.value) || 0)}
            className="border-0 h-8 px-2"
          />
        ),
      },
      {
        accessorKey: 'reach',
        header: 'Reach',
        cell: ({ row, column }) => (
          <Input
            type="number"
            value={row.original.reach || ''}
            onChange={(e) => handleCellEdit(row.index, column.id, parseInt(e.target.value) || 0)}
            className="border-0 h-8 px-2"
          />
        ),
      },
      {
        accessorKey: 'cpm',
        header: 'CPM ($)',
        cell: ({ row, column }) => (
          <Input
            type="number"
            step="0.1"
            value={row.original.cpm || ''}
            onChange={(e) => handleCellEdit(row.index, column.id, parseFloat(e.target.value) || 0)}
            className="border-0 h-8 px-2"
          />
        ),
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
            accessorKey: 'quarter',
            header: 'Quarter',
            cell: ({ row, column }) => (
              <Input
                value={row.original.quarter || ''}
                onChange={(e) => handleCellEdit(row.index, column.id, e.target.value)}
                className="border-0 h-8 px-2"
              />
            ),
          },
          {
            accessorKey: 'total_budget',
            header: 'Total Budget ($)',
            cell: ({ row, column }) => (
              <Input
                type="number"
                value={row.original.total_budget || ''}
                onChange={(e) => handleCellEdit(row.index, column.id, parseFloat(e.target.value) || 0)}
                className="border-0 h-8 px-2"
              />
            ),
          },
          {
            accessorKey: 'total_reach',
            header: 'Total Reach',
            cell: ({ row, column }) => (
              <Input
                type="number"
                value={row.original.total_reach || ''}
                onChange={(e) => handleCellEdit(row.index, column.id, parseInt(e.target.value) || 0)}
                className="border-0 h-8 px-2"
              />
            ),
          },
        ],
      },
    ];

    setSheets(mockSheets);
    setActiveSheet(mockSheets[0]?.name || '');
  }, [modelId]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Model Updated",
        description: `${model?.name} has been successfully updated.`,
      });
      
      navigate('/admin');
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

  const handleCellEdit = (rowIndex: number, columnId: string, value: any) => {
    setSheets(prev => prev.map(sheet => 
      sheet.name === activeSheet 
        ? {
            ...sheet,
            data: sheet.data.map((row, idx) =>
              idx === rowIndex ? { ...row, [columnId]: value } : row
            )
          }
        : sheet
    ));
  };

  const addSheet = () => {
    const sheetName = `Sheet ${sheets.length + 1}`;
    const newSheet: SheetData = {
      name: sheetName,
      data: [{ id: '1' }],
      columns: [
        {
          accessorKey: 'column1',
          header: 'Column 1',
          cell: ({ row, column }) => (
            <Input
              value={row.original.column1 || ''}
              onChange={(e) => handleCellEdit(row.index, column.id, e.target.value)}
              className="border-0 h-8 px-2"
            />
          ),
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
    const newColumn: ColumnDef<RowData> = {
      accessorKey: newColumnKey,
      header: `Column ${columnCount + 1}`,
      cell: ({ row, column }) => (
        <Input
          value={(row.original as any)[newColumnKey] || ''}
          onChange={(e) => handleCellEdit(row.index, column.id, e.target.value)}
          className="border-0 h-8 px-2"
        />
      ),
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
          
          const columns: ColumnDef<RowData>[] = headers.map(header => ({
            accessorKey: header,
            header: header,
            cell: ({ row, column }: any) => (
              <Input
                value={row.original[header] || ''}
                onChange={(e) => handleCellEdit(row.index, column.id, e.target.value)}
                className="border-0 h-8 px-2"
              />
            ),
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

  if (!model) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Loading...</h1>
            <p className="text-muted-foreground">Loading model data...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Edit Model: {model.name}</h1>
            <p className="text-muted-foreground mt-1">
              Market: {model.market} | Organization: {model.organization || 'Unassigned'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/admin')}>
              Back to Admin
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Model Data</span>
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
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sheets.length > 0 && (
              <Tabs value={activeSheet} onValueChange={setActiveSheet} className="space-y-4">
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
                  <TabsContent key={sheet.name} value={sheet.name} className="space-y-4">
                    <SheetTable data={sheet.data} columns={sheet.columns} />
                    <div className="text-xs text-muted-foreground">
                      {sheet.data.length} rows • Edit cells directly
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}