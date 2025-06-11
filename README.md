# Front-End Filter Optimization Dashboard

deployed link- https://brilliant-gecko-ba998a.netlify.app/

## Assignment Overview

This project is a technical assignment for the Full Stack Developer Intern position at LoopAI. It demonstrates the implementation of a business intelligence dashboard that mimics Amazon-style dynamic filters and displays data in a performant, interactive table.

## Project Description

The dashboard is designed to handle both small and large datasets, with filters that update based on available data, and a paginated, scrollable table view. It showcases the following technical skills:

- React and TypeScript implementation
- State management using Context API
- Performance optimization for large datasets
- Responsive UI design
- Data filtering and pagination
- Search functionality

## Features

- **Dynamic Filters:** Multi-select, searchable dropdowns for each column (modX), updating options based on current filtered data
- **Data Table:**
  - Pagination: 100 rows per page
  - Scrolling: Only 20 rows visible at a time (scroll to see the rest)
  - Responsive and styled for clarity
- **Performance:** Fast filtering and updates, even with large datasets
- **Configurable:** Easily switch datasets by changing the CSV file in the `public` directory

## Tech Stack

- ReactJS
- TypeScript
- Context API for state management
- [multiselect-react-dropdown](https://www.npmjs.com/package/multiselect-react-dropdown) for filters
- [papaparse](https://www.npmjs.com/package/papaparse) for CSV parsing

## Getting Started

### Prerequisites

- Node.js (v14 or above recommended)
- npm

### Setup

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
3. **Add your dataset:**
   - Place your CSV file (e.g., `dataset_small.csv` or `dataset_large.csv`) in the `frontend/public` directory
   - By default, the app loads `dataset_small.csv`. To use a different file, update the fetch path in `src/App.tsx`
4. **Start the development server:**
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000)

## Usage

- Use the filter dropdowns at the top to filter data by any column. Filter options update dynamically based on current selections
- Use the search box to search across all columns
- Scroll within the table to see up to 100 rows per page (20 visible at a time)
- Use the pagination controls to navigate between pages

## Project Structure

```
frontend/
  src/
    components/
      DataTable.tsx
      FilterDropdown.tsx
    context/
      DataContext.tsx
    App.tsx
    App.css
    ...
  public/
    dataset_small.csv
    ...
```

## Customization

- **To use a different dataset:** Place your CSV in `public` and update the fetch path in `App.tsx`
- **To change rows per page or visible rows:** Edit `ROWS_PER_PAGE` and the scroll container height in `DataTable.tsx`

## Author

Made with ❤️ by Raunak Agarwal

## License

This project is for educational and assignment purposes.

# LoopAI
