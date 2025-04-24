
import { CellData } from '@/contexts/MediaPlanContext';

export interface TableCell extends CellData {
  id: string;
}

export interface ColumnDef {
  id: string;
  name: string;
  locked: boolean;
}
