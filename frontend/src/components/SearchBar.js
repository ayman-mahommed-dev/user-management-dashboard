import "./SearchBar.css";

function SearchBar({ searchTerm, onSearchChange, sortBy, onSortChange, totalResults, totalUsers }) {
  return (
    <div className="search-bar">
      <div className="search-wrapper">
        <div className="search-input-group">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <i className="fas fa-sort filter-icon"></i>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="id-asc">ID (Asc)</option>
            <option value="id-desc">ID (Desc)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="email-asc">Email (A-Z)</option>
            <option value="email-desc">Email (Z-A)</option>
          </select>
        </div>

        {searchTerm && (
          <button className="clear-btn" onClick={() => onSearchChange("")}>
            <i className="fas fa-xmark"></i>
            Clear
          </button>
        )}
      </div>

      {searchTerm && (
        <div className="search-results">
          <i className="fas fa-filter"></i>
          Showing <span>{totalResults}</span> of <span>{totalUsers}</span> users
        </div>
      )}
    </div>
  );
}

export default SearchBar;
