import { useMemo } from "react";

interface PaginationProps {
  currentPage: number; // 当前页码
  totalPages: number; // 总页数
  pageSize?: number; // 可见页码数量，默认值为 5
  onPageChange: (page: number) => void; // 页码切换回调函数
}

export default function Pagination({
  currentPage,
  totalPages,
  pageSize = 5,
  onPageChange,
}: PaginationProps) {
  // 计算页码数组
  const pagination = useMemo(() => {
    const pages: (number | "...")[] = [];
    const half = Math.floor(pageSize / 2);

    if (totalPages <= pageSize) {
      // 总页数少于等于显示数量时，显示所有页
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= half + 1) {
      // 当前页接近开头时，不显示左边省略号
      for (let i = 1; i <= pageSize; i++) pages.push(i);
      pages.push("...", totalPages);
    } else if (currentPage > totalPages - half) {
      // 当前页接近结尾时，不显示右边省略号
      pages.push(1, "...");
      for (let i = totalPages - pageSize + 1; i <= totalPages; i++)
        pages.push(i);
    } else {
      // 当前页在中间时，两边都有省略号
      pages.push(1, "...");
      for (let i = currentPage - half; i <= currentPage + half; i++)
        pages.push(i);
      pages.push("...", totalPages);
    }

    return pages;
  }, [currentPage, totalPages, pageSize]);

  return (
    <ul className="flex flex-nowrap h-fit max-w-fit gap-1 items-center overflow-visible rounded-medium">
      {pagination.map((item, index) =>
        item === "..." ? (
          <span
            key={index}
            className="text-default-300 w-10 h-10 flex items-center justify-center"
          >
            ...
          </span>
        ) : (
          <li key={index}>
            <button
              className={`tap-highlight-transparent select-none touch-none transition-transform-background flex items-center justify-center w-10 h-10 text-medium rounded-medium ${
                item === currentPage
                  ? "bg-primary text-primary-foreground font-bold"
                  : "bg-default-100 hover:bg-default-200"
              }`}
              onClick={() => onPageChange(item as number)}
            >
              {item}
            </button>
          </li>
        )
      )}
    </ul>
  );
}
