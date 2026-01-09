import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="fas fa-chevron-left"></i>
        Prev
      </button>

      <div className="pagination-numbers">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`page-number ${currentPage === page ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="pagination-info">
        <i className="fas fa-list"></i>
        Showing <span>{startItem}-{endItem}</span> of <span>{totalItems}</span>
      </div>
    </div>
  );
}

export default Pagination;
