"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useFilterStore from "@/stores/useFiltereStore";

interface SortOption {
  id: string;
  label: string;
}

interface Props {
  options?: SortOption[];
}

const defaultOptions: SortOption[] = [
  { id: "all", label: "All" },
  { id: "newest", label: "Newest" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
];

const SortButton = ({ options = defaultOptions }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort");
  
  const setSort = useFilterStore(state => state.setSort);
  const resetFilters = useFilterStore(state => state.resetFilters);

  const selectedOption = currentSort
    ? options.find((option) => option.id === currentSort)
    : undefined;

  const handleSelect = (option: SortOption) => {
    if (option.id === "all") {
      resetFilters();
      router.push(pathname);
      return;
    }

    const isSelected = currentSort === option.id;

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...Object.fromEntries(searchParams.entries()),
          sort: isSelected ? null : option.id,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);

    if (option.id === "price_asc") {
      setSort("asc", "rent");
    } else if (option.id === "price_desc") {
      setSort("desc", "rent");
    } else if (option.id === "newest") {
      setSort("desc", "createdAt");
    } else {
      setSort(null, "rent");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-2 py-1 text-sm font-medium focus:outline-none transition-colors">
        <span
          className={selectedOption ? "text-neutral-900/50" : "text-neutral-600"}
        >
          {selectedOption ? selectedOption.label : "All"}
        </span>
        <span className="ms-2">
          <svg
            width="16"
            height="14"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 0.25C1.48122 0.25 0.25 1.48122 0.25 3C0.25 4.51878 1.48122 5.75 3 5.75C4.51878 5.75 5.75 4.51878 5.75 3C5.75 1.48122 4.51878 0.25 3 0.25ZM1.75 3C1.75 2.30964 2.30964 1.75 3 1.75C3.69036 1.75 4.25 2.30964 4.25 3C4.25 3.69036 3.69036 4.25 3 4.25C2.30964 4.25 1.75 3.69036 1.75 3Z"
              fill="#2D264B"
            />
            <path
              d="M9 2.25C8.58579 2.25 8.25 2.58579 8.25 3C8.25 3.41421 8.58579 3.75 9 3.75L17 3.75C17.4142 3.75 17.75 3.41421 17.75 3C17.75 2.58579 17.4142 2.25 17 2.25L9 2.25Z"
              fill="#2D264B"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15 10.25C13.4812 10.25 12.25 11.4812 12.25 13C12.25 14.5188 13.4812 15.75 15 15.75C16.5188 15.75 17.75 14.5188 17.75 13C17.75 11.4812 16.5188 10.25 15 10.25ZM13.75 13C13.75 12.3096 14.3096 11.75 15 11.75C15.6904 11.75 16.25 12.3096 16.25 13C16.25 13.6904 15.6904 14.25 15 14.25C14.3096 14.25 13.75 13.6904 13.75 13Z"
              fill="#2D264B"
            />
            <path
              d="M1 12.25C0.585787 12.25 0.25 12.5858 0.25 13C0.25 13.4142 0.585786 13.75 1 13.75L9 13.75C9.41421 13.75 9.75 13.4142 9.75 13C9.75 12.5858 9.41421 12.25 9 12.25L1 12.25Z"
              fill="#2D264B"
            />
          </svg>
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.id}
            className={`cursor-pointer ${
              currentSort === option.id
                ? "bg-lystioPurple/10 text-lystioPurple"
                : ""
            }`}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortButton;