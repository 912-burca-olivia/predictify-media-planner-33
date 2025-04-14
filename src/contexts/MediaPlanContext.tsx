
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for our media plan data
export type MediaChannel = {
  id: string;
  name: string;
  locked: boolean;
};

export type MonthData = {
  id: string;
  name: string;
  locked: boolean;
};

export type CellData = {
  channelId: string;
  monthId: string;
  spend: number;
  locked: boolean;
  priceIndex: number;
  seasonalIndex: number;
};

interface MediaPlanContextType {
  channels: MediaChannel[];
  setChannels: React.Dispatch<React.SetStateAction<MediaChannel[]>>;
  months: MonthData[];
  setMonths: React.Dispatch<React.SetStateAction<MonthData[]>>;
  cellData: CellData[];
  setCellData: React.Dispatch<React.SetStateAction<CellData[]>>;
}

const MediaPlanContext = createContext<MediaPlanContextType | undefined>(undefined);

// Sample initial data
const initialChannels: MediaChannel[] = [
  { id: 'tv', name: 'TV', locked: false },
  { id: 'radio', name: 'Radio', locked: false },
  { id: 'social', name: 'Social Media', locked: false },
  { id: 'search', name: 'Search', locked: false },
  { id: 'display', name: 'Display', locked: false },
  { id: 'print', name: 'Print', locked: false },
];

const initialMonths: MonthData[] = [
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
];

// Generate initial cell data
const generateInitialCellData = (): CellData[] => {
  const cells: CellData[] = [];
  initialChannels.forEach(channel => {
    initialMonths.forEach(month => {
      cells.push({
        channelId: channel.id,
        monthId: month.id,
        spend: Math.floor(Math.random() * 100000),
        locked: false,
        priceIndex: 100,
        seasonalIndex: 100
      });
    });
  });
  return cells;
};

export const MediaPlanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [channels, setChannels] = useState<MediaChannel[]>(initialChannels);
  const [months, setMonths] = useState<MonthData[]>(initialMonths);
  const [cellData, setCellData] = useState<CellData[]>(generateInitialCellData());

  return (
    <MediaPlanContext.Provider value={{ 
      channels, setChannels, 
      months, setMonths, 
      cellData, setCellData 
    }}>
      {children}
    </MediaPlanContext.Provider>
  );
};

export const useMediaPlan = () => {
  const context = useContext(MediaPlanContext);
  if (context === undefined) {
    throw new Error('useMediaPlan must be used within a MediaPlanProvider');
  }
  return context;
};
