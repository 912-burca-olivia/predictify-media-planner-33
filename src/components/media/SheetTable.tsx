import { ReactGrid, Column, Row, CellChange, TextCell, NumberCell, MenuOption, Id } from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.css';

interface RowData {
  id?: string;
  [key: string]: any;
}

interface SheetTableProps {
  data: RowData[];
  columnKeys: string[];
  onCellsChanged: (changes: CellChange[]) => void;
  onAddRow: () => void;
  onDeleteRow: (rowId: Id) => void;
}

export function SheetTable({ data, columnKeys, onCellsChanged, onAddRow, onDeleteRow }: SheetTableProps) {
  const columns: Column[] = columnKeys.map(key => ({
    columnId: key,
    width: 150,
    resizable: true,
  }));

  const headerRow: Row = {
    rowId: 'header',
    cells: columnKeys.map(key => ({ type: 'header', text: key })),
  };

  const rows: Row[] = data.map((rowData, idx) => ({
    rowId: rowData.id || idx,
    cells: columnKeys.map(key => {
      const value = rowData[key];
      if (typeof value === 'number') {
        return { type: 'number', value } as NumberCell;
      }
      return { type: 'text', text: String(value || '') } as TextCell;
    }),
  }));

  const getRows = () => [headerRow, ...rows];

  const handleContextMenu = (
    selectedRowIds: Id[],
    selectedColIds: Id[],
    selectionMode: string,
    menuOptions: MenuOption[]
  ): MenuOption[] => {
    if (selectedRowIds.length > 0 && selectedRowIds[0] !== 'header') {
      return [
        ...menuOptions,
        {
          id: 'addRowBelow',
          label: 'Add row below',
          handler: () => onAddRow(),
        },
        {
          id: 'deleteRow',
          label: 'Delete row',
          handler: () => {
            selectedRowIds.forEach(id => onDeleteRow(id));
          },
        },
      ];
    }
    return menuOptions;
  };

  return (
    <div className="border rounded-md" style={{ height: '600px' }}>
      <ReactGrid
        rows={getRows()}
        columns={columns}
        onCellsChanged={onCellsChanged}
        enableRangeSelection
        enableFillHandle
        enableRowSelection
        enableColumnSelection
        stickyTopRows={1}
        onContextMenu={handleContextMenu}
      />
    </div>
  );
}
