import React from "react";
import Multiselect from "multiselect-react-dropdown";

export interface FilterDropdownProps {
  label: string;
  options: Array<string | number>;
  selected: Array<string | number>;
  onChange: (selected: Array<string | number>) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  // Convert options and selected values to objects with a 'name' property
  const stringOptions = options
    .map(String)
    .filter((v) => v !== undefined && v !== null && v !== "")
    .map((v) => ({ name: v }));
  const stringSelected = selected
    .map(String)
    .filter((v) => v !== undefined && v !== null && v !== "")
    .map((v) => ({ name: v }));

  return (
    <div style={{ minWidth: 200, margin: "0 8px 16px 0" }}>
      <label
        style={{
          fontWeight: 600,
          display: "block",
          marginBottom: 8,
          color: "#475569",
          fontSize: "0.875rem",
        }}
      >
        {label}
      </label>
      <Multiselect
        options={stringOptions}
        selectedValues={stringSelected}
        onSelect={(selectedList) =>
          onChange(selectedList.map((v: any) => v.name))
        }
        onRemove={(selectedList) =>
          onChange(selectedList.map((v: any) => v.name))
        }
        displayValue="name"
        showCheckbox
        placeholder={`Select ${label}`}
        style={{
          chips: {
            background: "#3b82f6",
            borderRadius: "4px",
            padding: "4px 8px",
            margin: "4px",
          },
          multiselectContainer: {
            minWidth: 180,
            borderRadius: "6px",
            border: "1px solid #e2e8f0",
          },
          searchBox: {
            borderRadius: "6px",
            border: "1px solid #e2e8f0",
            padding: "8px",
          },
          optionContainer: {
            borderRadius: "6px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          },
          option: {
            padding: "8px 12px",
            color: "#1e293b",
          },
        }}
        avoidHighlightFirstOption
        hidePlaceholder={true}
        showArrow
        closeIcon="cancel"
        selectionLimit={-1}
      />
    </div>
  );
};

export default FilterDropdown;
