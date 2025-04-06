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
import useFilterStore from "@/stores/useFiltereStore";

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

  const currentValue = useCurrentValue(paramName);

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


function useCurrentValue(paramName: string): string | null {
  const filters = useFilterStore(state => state.filters);
  
  switch (paramName) {
    case "propertyType":
      return getPropertyTypeId(filters.filter.type?.[0]);
    case "rentType":
      return getRentTypeId(filters.filter.rentType?.[0]);
    case "beds":
      return getBedsId(filters.filter.roomsBed?.[0]);
    case "pets":
      return getPetsId(filters.filter.pets?.[0]);
    default:
      return null;
  }
}

function getPropertyTypeId(type?: number): string | null {
  if (!type) return null;
  const map: Record<number, string> = {
    1: "house",
    2: "apartment",
    3: "condo",
    4: "villa",
    5: "townhouse"
  };
  return map[type] || null;
}

function getRentTypeId(rentType?: string): string | null {
  if (!rentType) return null;
  const map: Record<string, string> = {
    "month": "monthly",
    "week": "weekly",
    "day": "daily"
  };
  return map[rentType] || null;
}

function getBedsId(beds?: number): string | null {
  if (!beds) return null;
  if (beds >= 5) return "5plus";
  return `${beds}bed`;
}

function getPetsId(pets?: string): string | null {
  if (!pets) return null;
  if (pets === "allowed") return "allowed";
  if (pets === "notAllowed") return "notAllowed";
  return null;
}

export default FilterOption;