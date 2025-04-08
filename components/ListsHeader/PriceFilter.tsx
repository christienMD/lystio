'use client';

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import useFilterStore from "@/stores/useFiltereStore";

interface Props {
  defaultMin?: number;
  defaultMax?: number;
  min?: number;
  max?: number;
}

const PriceFilter = ({ 
  defaultMin = 1, 
  defaultMax = 9_999_999,
  min = 1,
  max = 10000,
}: Props) => {
  const [localValues, setLocalValues] = useState<[number, number]>([defaultMin, defaultMax]);
  
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const minPrice = searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!) : defaultMin;
  const maxPrice = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : defaultMax;
  
  const setPriceRange = useFilterStore(state => state.setPriceRange);
  
  useEffect(() => {
    setLocalValues([minPrice, maxPrice]);
    
    setPriceRange(minPrice, maxPrice);
  }, [minPrice, maxPrice, setPriceRange]);
  
  const handleApply = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...Object.fromEntries(searchParams.entries()),
          minPrice: localValues[0].toString(),
          maxPrice: localValues[1].toString()
        },
      },
      { skipEmptyString: true }
    );
    
    router.push(url);
    
    setPriceRange(localValues[0], localValues[1]);
  };

  const handleReset = () => {
    setLocalValues([defaultMin, defaultMax]);
  };

  const isFiltered = minPrice !== defaultMin || maxPrice !== defaultMax;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center py-4 px-2 text-sm font-medium transition-colors focus:outline-none">
        <span className={isFiltered ? "text-neutral-900" : "text-neutral-800"}>
          Price: <span className="text-neutral-900/50">€{minPrice} - €{maxPrice}</span>
        </span>
        <ChevronDown size={16} className="ml-1" />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="center" className="w-72 p-4">
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="text-sm font-medium">Min: €{localValues[0]}</div>
            <div className="text-sm font-medium">Max: €{localValues[1]}</div>
          </div>
          
          <Slider
            value={localValues}
            min={min}
            max={max}
            step={50}
            onValueChange={(value) => setLocalValues([value[0], value[1]])}
            className="my-6"
          />
          
          <div className="flex justify-between space-x-2">
            <input
              type="number"
              value={localValues[0]}
              onChange={(e) => {
                const newMin = Math.max(min, Math.min(parseInt(e.target.value || min.toString()), localValues[1]));
                setLocalValues([newMin, localValues[1]]);
              }}
              className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
              min={min}
              max={localValues[1]}
            />
            <span className="flex items-center">-</span>
            <input
              type="number"
              value={localValues[1]}
              onChange={(e) => {
                const newMax = Math.min(max, Math.max(parseInt(e.target.value || max.toString()), localValues[0]));
                setLocalValues([localValues[0], newMax]);
              }}
              className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
              min={localValues[0]}
              max={max}
            />
          </div>
          
          <div className="flex justify-between pt-2">
            <Button 
              variant="ghost" 
              onClick={handleReset}
              className="h-8 px-2 text-sm"
            >
              Reset
            </Button>
            <div className="space-x-2">
              <Button 
                variant="default" 
                onClick={handleApply}
                className="h-8 px-4 text-sm bg-lystioPurple hover:bg-lystioPurple/90"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PriceFilter;