import { useRef, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, CellValueChangedEvent, GetContextMenuItemsParams, MenuItemDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface RowData {
  id?: string;
  [key: string]: any;
}

interface CellChange {
  rowId: string | number;
  columnId: string;
  newCell: { type: string; value?: number; text?: string };
}

interface SheetTableProps {
  data: RowData[];
  columnKeys: string[];
  onCellsChanged: (changes: CellChange[]) => void;
  onAddRow: () => void;
  onDeleteRow: (rowId: string | number) => void;
}

export function SheetTable({ data, columnKeys, onCellsChanged, onAddRow, onDeleteRow }: SheetTableProps) {
  const gridRef = useRef<AgGridReact>(null);

  const columnDefs: ColDef[] = useMemo(() => 
    columnKeys.map(key => ({
      field: key,
      headerName: key,
      editable: true,
      resizable: true,
      width: 150,
      valueParser: (params: any) => {
        const value = params.newValue;
        // Try to parse as number
        const num = Number(value);
        return !isNaN(num) && value !== '' ? num : value;
      },
    })),
    [columnKeys]
  );

  const rowData = useMemo(() => 
    data.map((row, idx) => ({
      ...row,
      id: row.id || idx,
    })),
    [data]
  );

  const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
    const rowId = event.data.id;
    const columnId = event.colDef.field!;
    const newValue = event.newValue;
    
    const change: CellChange = {
      rowId,
      columnId,
      newCell: typeof newValue === 'number' 
        ? { type: 'number', value: newValue }
        : { type: 'text', text: String(newValue || '') }
    };
    
    onCellsChanged([change]);
  }, [onCellsChanged]);

  const getContextMenuItems = useCallback((params: GetContextMenuItemsParams): (MenuItemDef)[] => {
    const result: MenuItemDef[] = [
      {
        name: 'Add Row Below',
        action: () => onAddRow(),
        icon: '<span class="ag-icon ag-icon-plus"></span>',
      },
    ];

    if (params.node) {
      result.push({
        name: 'Delete Row',
        action: () => {
          const rowId = params.node!.data.id;
          onDeleteRow(rowId);
        },
        icon: '<span class="ag-icon ag-icon-cross"></span>',
      });
    }

    return result;
  }, [onAddRow, onDeleteRow]);

  return (
    <div className="rounded-lg border border-border overflow-hidden shadow-sm" style={{ height: '600px' }}>
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={rowData}
          onCellValueChanged={onCellValueChanged}
          getContextMenuItems={getContextMenuItems}
          enableRangeSelection={true}
          enableFillHandle={true}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          getRowId={(params) => String(params.data.id)}
        />
      </div>
    </div>
  );
}
