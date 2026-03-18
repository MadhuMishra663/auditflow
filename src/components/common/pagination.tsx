"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // LINE 30–75: Replaced full loop with ellipsis-aware page rendering
  const renderPages = () => {
    const pages: React.ReactNode[] = [];

    const btnClass = (active: boolean) =>
      `w-9 h-9 flex items-center justify-center rounded-full border text-sm font-medium transition-colors
      ${
        active
          ? "bg-gray-400 text-white border-gray-400"           // LINE 37: Teal active color
          : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50" // LINE 38: Subtle inactive style
      }`;

    const ellipsis = (key: string) => (
      // LINE 42–44: New ellipsis span matching photo's "..." separators
      <span key={key} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
        ...
      </span>
    );

    const pageBtn = (i: number) => (
      <button key={i} onClick={() => onPageChange(i)} className={btnClass(currentPage === i)}>
        {i}
      </button>
    );

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(pageBtn(i));
    } else {
      // LINE 56–75: Smart windowing — always show p-1, p-2 around current, last page, with "..."
      pages.push(pageBtn(1));

      const showLeftEllipsis = currentPage > 3;
      const showRightEllipsis = currentPage < totalPages - 2;

      if (showLeftEllipsis) pages.push(ellipsis("left"));

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(pageBtn(i));

      if (showRightEllipsis) pages.push(ellipsis("right"));

      pages.push(pageBtn(totalPages));
    }

    return pages;
  };

  // LINE 81–82: Compute "Showing X to Y of Z" values
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    // LINE 85: Changed to justify-between so text is left, pagination is right
    <div className="flex items-center justify-between w-full px-2 py-3">

      {/* LINE 88: New result count label matching photo's left-side text */}
      <span className="text-sm text-gray-500">
        Showing {startItem} to {endItem} of {totalItems} results
      </span>

      {/* LINE 93: Pagination controls grouped on the right */}
      <div className="flex items-center gap-1">

        {/* LINE 96–102: Prev button now circular with "<" icon */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40 transition-colors"
        >
          ‹
        </button>

        {renderPages()}

        {/* LINE 109–115: Next button now circular with ">" icon */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40 transition-colors"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Pagination;