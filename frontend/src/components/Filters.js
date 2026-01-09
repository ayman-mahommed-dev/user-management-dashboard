import "./Filters.css";

function Filters({ filters, onFilterChange, options, onExport, onAddNew }) {
  return (
    <div className="filters-bar">
      <div className="filters-left">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search employees..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
          />
        </div>

        <div className="filter-select-wrapper">
          <i className="fas fa-building"></i>
          <select
            value={filters.department}
            onChange={(e) => onFilterChange("department", e.target.value)}
          >
            <option value="all">All Departments</option>
            {options.departments?.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="filter-select-wrapper">
          <i className="fas fa-circle-check"></i>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="filters-right">
        <button className="btn-export" onClick={onExport}>
          <i className="fas fa-download"></i>
          Export
        </button>
        <button className="btn-add" onClick={onAddNew}>
          <i className="fas fa-plus"></i>
          Add Employee
        </button>
      </div>
    </div>
  );
}

export default Filters;
