
import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useMediaPlan } from '@/contexts/MediaPlanContext';
import { TableCell, ColumnDef } from '@/components/media/types';

export const useMediaTable = () => {
  const { channels, months, cellData, setCellData } = useMediaPlan();
  
  const columnHelper = createColumnHelper<TableCell>();
  
  const columns = useMemo(() => {
    const baseColumns = [
      columnHelper.display({
        id: 'channel',
        header: 'Channel',
        cell: ({ row }) => {
          const channel = channels.find(c => c.id === row.original.channelId);
          return channel?.name || '';
        },
      }),
    ];

    const monthColumns = months.map(month => 
      columnHelper.accessor(row => {
        const cell = cellData.find(
          c => c.channelId === row.channelId && c.monthId === month.id
        );
        return cell?.spend || 0;
      }, {
        id: month.id,
        header: month.name,
        cell: info => new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0
        }).format(info.getValue()),
      })
    );

    return [...baseColumns, ...monthColumns];
  }, [months, channels, cellData]);

  const data = useMemo(() => 
    channels.map(channel => ({
      id: channel.id,
      channelId: channel.id,
      monthId: months[0].id, // Default monthId
      spend: 0,
      locked: false,
      priceIndex: 100,
      seasonalIndex: 100,
    })),
    [channels]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return { table };
};
