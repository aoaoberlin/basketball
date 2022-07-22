import React, { useEffect } from "react";

const TableFooter = ({ setPage, page, slice, range }) => {
    function goToNextPage() {
        if (page < range.length) setPage((page) => page + 1);
    }
    function goToPreviousPage() {
      if (page > 1) setPage((page) => page - 1);
    }
    const getPaginationGroup = () => {
        const pageLimit = 3;
        let start = Math.floor((page - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
        setPage(page - 1);
        }
    }, [slice, page, setPage]);
    return (
    
    <div className="pagination">
      <button onClick={goToPreviousPage}>
        prev
      </button>
      {getPaginationGroup().map((item, index) => (
        <button
          key={index}
          onClick={() => setPage(item)}
        >
          {item}
        </button>
      ))}
      <button onClick={goToNextPage}      >
        next
      </button>
      </div>
  );
};

export default TableFooter;