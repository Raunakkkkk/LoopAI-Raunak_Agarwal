import React, { useEffect, useState, useCallback, useMemo } from "react";
import Papa, { ParseResult } from "papaparse";
import "./App.css";
import { DataProvider, useDataContext, DataRow } from "./context/DataContext";
import FilterDropdown from "./components/FilterDropdown";
import DataTable from "./components/DataTable";

const AppContent: React.FC = () => {
  const { data, setData, filteredData, setFilteredData, filters, setFilters } =
    useDataContext();
  const [headers, setHeaders] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/dataset_large.csv");
        const csvText = await response.text();

        Papa.parse<DataRow>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: ParseResult<DataRow>) => {
            setData(results.data);
            setFilteredData(results.data);
            if (results.meta.fields) setHeaders(results.meta.fields);
            setIsLoading(false);
          },
          error: (error: Error) => {
            console.error("Error parsing CSV:", error);
            setIsLoading(false);
          },
        });
      } catch (error) {
        console.error("Error loading CSV:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, [setData, setFilteredData]);

  // Memoized filter logic
  const applyFilters = useCallback(
    (dataToFilter: DataRow[]) => {
      return dataToFilter.filter((row) =>
        Object.entries(filters).every(
          ([col, vals]) => vals.length === 0 || vals.includes(row[col])
        )
      );
    },
    [filters]
  );

  // Filter effect with memoization
  useEffect(() => {
    const filtered = applyFilters(data);
    setFilteredData(filtered);
    setPage(0);
  }, [filters, data, setFilteredData, applyFilters]);

  // Memoized page change handler
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  // Memoized dropdown options
  const getDropdownOptions = useCallback(
    (col: string) => {
      const filtered = applyFilters(data);
      return Array.from(new Set(filtered.map((row) => row[col])));
    },
    [data, applyFilters]
  );

  // Memoized filter headers
  const filterHeaders = useMemo(
    () => headers.filter((h) => h !== "number"),
    [headers]
  );

  // Memoized search handler
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(0);
  }, []);

  // Memoized clear filters handler
  const handleClearFilters = useCallback(() => {
    setFilters({});
    setSearchTerm("");
    setPage(0);
  }, [setFilters]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Dataset Filter Dashboard</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search in all columns..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="clear-filters-btn" onClick={handleClearFilters}>
          Clear All Filters
        </button>
      </div>
      <div className="filters-row">
        {filterHeaders.map((header) => (
          <FilterDropdown
            key={header}
            label={header}
            options={getDropdownOptions(header)}
            selected={filters[header] || []}
            onChange={(vals) =>
              setFilters((prev) => ({ ...prev, [header]: vals }))
            }
          />
        ))}
      </div>
      <DataTable
        data={filteredData}
        headers={headers}
        page={page}
        onPageChange={handlePageChange}
        searchTerm={searchTerm}
      />
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#64748b",
          fontSize: "0.875rem",
          fontStyle: "italic",
        }}
      >
        Made with ❤️ by Raunak Agarwal
      </div>
    </div>
  );
};

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

export default App;
