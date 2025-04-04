'use client'

import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import FilterOption from "./ListsHeader/FilterOption";
import PriceFilter from "./ListsHeader/PriceFilter";
import SortButton from "./ListsHeader/SortButton";

interface Props {}

// Property types options
const propertyTypeOptions = [
  { id: "house", label: "House" },
  { id: "apartment", label: "Apartment" },
  { id: "condo", label: "Condo" },
  { id: "villa", label: "Villa" },
  { id: "townhouse", label: "Townhouse" }
];

// Rent options
const rentOptions = [
  { id: "monthly", label: "Monthly" },
  { id: "weekly", label: "Weekly" },
  { id: "daily", label: "Daily" }
];

// Apartment options
const apartmentOptions = [
  { id: "studio", label: "Studio" },
  { id: "1bed", label: "1 Bedroom" },
  { id: "2bed", label: "2 Bedroom" },
  { id: "3plus", label: "3+ Bedroom" }
];

// Beds/baths options
const bedsOptions = [
  { id: "1bed", label: "1 Bed" },
  { id: "2bed", label: "2 Beds" },
  { id: "3bed", label: "3 Beds" },
  { id: "4bed", label: "4 Beds" },
  { id: "5plus", label: "5+ Beds" }
];

// Living rooms options
const livingRoomsOptions = [
  { id: "1lr", label: "1 Living Room" },
  { id: "2lr", label: "2 Living Rooms" },
  { id: "3plus", label: "3+ Living Rooms" }
];

// Pets options
const petsOptions = [
  { id: "allowed", label: "Allowed" },
  { id: "notAllowed", label: "Not Allowed" }
];

// Deposit options
const depositOptions = [
  { id: "required", label: "Required" },
  { id: "notRequired", label: "Not Required" }
];

// Sort options
const sortOptions = [
  { id: "all", label: "All" },
  { id: "newest", label: "Newest" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" }
];

const ListsHeader = ({}: Props) => {
  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <ScrollArea className="w-full">
          <div className="flex items-center py-1 min-w-max">
            <FilterOption 
              label="Rent" 
              paramName="rentType"
              options={rentOptions}
            />
            <FilterOption 
              label="Apartment" 
              paramName="apartmentType"
              options={apartmentOptions}
            />
            <FilterOption 
              label="Property type" 
              paramName="propertyType"
              options={propertyTypeOptions}
            />
            <FilterOption 
              label="Beds/baths" 
              paramName="beds"
              options={bedsOptions}
            />
            <FilterOption 
              label="Living rooms" 
              paramName="livingRooms"
              options={livingRoomsOptions}
            />
            <FilterOption 
              label="Pets" 
              paramName="pets"
              options={petsOptions}
            />
            <FilterOption 
              label="Deposit" 
              paramName="deposit"
              options={depositOptions}
            />

            <div className="ml-2">
              <PriceFilter 
                defaultMin={300}
                defaultMax={500}
                min={0}
                max={10000}
              />
            </div>

            <div className="ml-auto flex items-center">
              <SortButton 
                options={sortOptions}
              />
            </div>
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ListsHeader;