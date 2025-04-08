/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OptionType {
  id: string;
  label: string;
  value: number | string;
}

interface Props {
  label: string;
  paramName: string;
  options?: OptionType[];
  filterSetter: (value: any) => void;
}

const FilterOption = ({ label, paramName, options = [], filterSetter }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentValue = searchParams.get(paramName);

  const handleSelect = (option: OptionType) => {
    const isSelected = currentValue === option.id;
    filterSetter(isSelected ? null : option.value);

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...Object.fromEntries(searchParams.entries()),
          [paramName]: isSelected ? null : option.id,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  const selectedOption = options.find((option) => option.id === currentValue);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center h-full py-4 px-2 text-sm font-medium transition-colors focus:outline-none">
        <span
          className={currentValue ? "text-neutral-900" : "text-neutral-800"}
        >
          {currentValue ? (
            <>
              {label}:{" "}
              <span className="text-neutral-900/50">
                {selectedOption?.label}
              </span>
            </>
          ) : (
            label
          )}
        </span>
        <ChevronDown size={16} className="ml-1" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-48">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.id}
            className={`cursor-pointer ${
              currentValue === option.id
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

export default FilterOption;