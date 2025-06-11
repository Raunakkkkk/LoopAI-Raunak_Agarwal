import React, { useMemo, useState } from "react";

export interface DataTableProps {
  data: Array<{ [key: string]: string | number }>;
  headers: string[];
  page: number;
  onPageChange: (page: number) => void;
  searchTerm?: string;
}

const ROWS_PER_PAGE = 100;
const VISIBLE_ROWS = 20;

type SortDirection = "asc" | "desc" | null;

const DataTable: React.FC<DataTableProps> = ({
  data,
  headers,
  page,
  onPageChange,
  searchTerm = "",
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const searchLower = searchTerm.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchLower)
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      // Handle numeric values
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      // Handle string values
      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();
      return sortDirection === "asc"
        ? aString.localeCompare(bString)
        : bString.localeCompare(aString);
    });
  }, [filteredData, sortColumn, sortDirection]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Simplified pagination logic
  const totalRows = sortedData.length;
  const totalPages = Math.ceil(totalRows / ROWS_PER_PAGE);
  const currentPage = Math.min(page, totalPages - 1); // Ensure we don't exceed total pages
  const startRow = currentPage * ROWS_PER_PAGE;
  const endRow = Math.min(startRow + ROWS_PER_PAGE, totalRows);
  const currentPageData = sortedData.slice(startRow, endRow);

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return "↕️";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          maxHeight: `${VISIBLE_ROWS * 40}px`, // 40px per row
          overflowY: "auto",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e2e8f0",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead
            style={{
              position: "sticky",
              top: 0,
              background: "white",
              zIndex: 1,
              borderBottom: "2px solid #e2e8f0",
            }}
          >
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  onClick={() => handleSort(header)}
                  style={{
                    cursor: "pointer",
                    userSelect: "none",
                    position: "relative",
                    padding: "12px 16px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#1e293b",
                    backgroundColor: "#f8fafc",
                    borderBottom: "2px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {header}
                    <span
                      style={{
                        fontSize: "0.875rem",
                        opacity: sortColumn === header ? 1 : 0.5,
                      }}
                    >
                      {getSortIcon(header)}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    style={{
                      padding: "12px 16px",
                      color: "#475569",
                      fontSize: "0.875rem",
                    }}
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "1px solid #e2e8f0",
              background: currentPage === 0 ? "#f1f5f9" : "white",
              color: currentPage === 0 ? "#94a3b8" : "#475569",
              cursor: currentPage === 0 ? "not-allowed" : "pointer",
              fontWeight: 500,
            }}
          >
            Previous
          </button>
          <span
            style={{
              color: "#475569",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "0 16px",
            }}
          >
            Page {currentPage + 1}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "1px solid #e2e8f0",
              background: currentPage >= totalPages - 1 ? "#f1f5f9" : "white",
              color: currentPage >= totalPages - 1 ? "#94a3b8" : "#475569",
              cursor: currentPage >= totalPages - 1 ? "not-allowed" : "pointer",
              fontWeight: 500,
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
