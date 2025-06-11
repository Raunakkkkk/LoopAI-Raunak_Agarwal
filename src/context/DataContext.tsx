import React, { createContext, useContext, useState } from 'react';

export interface DataRow {
  [key: string]: string | number;
}

export interface Filters {
  [key: string]: Array<string | number>;
}

interface DataContextType {
  data: DataRow[];
  setData: React.Dispatch<React.SetStateAction<DataRow[]>>;
  filteredData: DataRow[];
  setFilteredData: React.Dispatch<React.SetStateAction<DataRow[]>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DataRow[]>([]);
  const [filteredData, setFilteredData] = useState<DataRow[]>([]);
  const [filters, setFilters] = useState<Filters>({});

  return (
    <DataContext.Provider value={{ data, setData, filteredData, setFilteredData, filters, setFilters }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useDataContext must be used within a DataProvider');
  return context;
}; 