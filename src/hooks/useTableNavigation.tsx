
import { useState, useEffect, KeyboardEvent } from 'react';
import { CellData } from '@/contexts/MediaPlanContext';

interface Position {
  channelId: string;
  monthId: string;
}

export const useTableNavigation = (
  channels: { id: string }[],
  months: { id: string }[],
  onCellSelect: (cell: CellData) => void
) => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [selectedCells, setSelectedCells] = useState<Position[]>([]);
  const [copyBuffer, setCopyBuffer] = useState<string | null>(null);

  const findCellIndex = (pos: Position) => {
    const channelIndex = channels.findIndex(c => c.id === pos.channelId);
    const monthIndex = months.findIndex(m => m.id === pos.monthId);
    return { channelIndex, monthIndex };
  };

  const movePosition = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!currentPosition) return;

    const { channelIndex, monthIndex } = findCellIndex(currentPosition);
    let newChannelIndex = channelIndex;
    let newMonthIndex = monthIndex;

    switch (direction) {
      case 'up':
        newChannelIndex = Math.max(0, channelIndex - 1);
        break;
      case 'down':
        newChannelIndex = Math.min(channels.length - 1, channelIndex + 1);
        break;
      case 'left':
        newMonthIndex = Math.max(0, monthIndex - 1);
        break;
      case 'right':
        newMonthIndex = Math.min(months.length - 1, monthIndex + 1);
        break;
    }

    const newPosition = {
      channelId: channels[newChannelIndex].id,
      monthId: months[newMonthIndex].id,
    };
    setCurrentPosition(newPosition);
    setSelectedCells([newPosition]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!currentPosition) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        movePosition('up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        movePosition('down');
        break;
      case 'ArrowLeft':
        e.preventDefault();
        movePosition('left');
        break;
      case 'ArrowRight':
        e.preventDefault();
        movePosition('right');
        break;
      case 'c':
        if (e.ctrlKey || e.metaKey) {
          const selectedValues = selectedCells.map(cell => cell.monthId + ',' + cell.channelId).join(';');
          setCopyBuffer(selectedValues);
        }
        break;
      case 'v':
        if (e.ctrlKey || e.metaKey && copyBuffer) {
          // Handle paste event through callback
          onPaste(copyBuffer, currentPosition);
        }
        break;
    }
  };

  return {
    currentPosition,
    setCurrentPosition,
    selectedCells,
    setSelectedCells,
    handleKeyDown,
  };
};

