"use client";

import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useFilterStore from "@/stores/useFiltereStore";
import FilterOption from "../ListsHeader/FilterOption";
import SortButton from "../ListsHeader/SortButton";
import PriceFilter from "../ListsHeader/PriceFilter";

const propertyTypeOptions = [
  { id: "house", label: "House", value: 1 },
  { id: "apartment", label: "Apartment", value: 2 },
  { id: "condo", label: "Condo", value: 3 },
  { id: "villa", label: "Villa", value: 4 },
  { id: "townhouse", label: "Townhouse", value: 5 },
];

const rentOptions = [
  { id: "monthly", label: "Monthly", value: "month" },
  { id: "weekly", label: "Weekly", value: "week" },
  { id: "daily", label: "Daily", value: "day" },
];

const apartmentOptions = [
  { id: "studio", label: "Studio", value: 0 },
  { id: "1bed", label: "1 Bedroom", value: 1 },
  { id: "2bed", label: "2 Bedroom", value: 2 },
  { id: "3plus", label: "3+ Bedroom", value: 3 },
];

const bedsOptions = [
  { id: "1bed", label: "1 Bed", value: 1 },
  { id: "2bed", label: "2 Beds", value: 2 },
  { id: "3bed", label: "3 Beds", value: 3 },
  { id: "4bed", label: "4 Beds", value: 4 },
  { id: "5plus", label: "5+ Beds", value: 5 },
];

const livingRoomsOptions = [
  { id: "1lr", label: "1 Living Room", value: 1 },
  { id: "2lr", label: "2 Living Rooms", value: 2 },
  { id: "3plus", label: "3+ Living Rooms", value: 3 },
];

const petsOptions = [
  { id: "allowed", label: "Allowed", value: "allowed" },
  { id: "notAllowed", label: "Not Allowed", value: "notAllowed" },
];

const depositOptions = [
  { id: "required", label: "Required", value: "required" },
  { id: "notRequired", label: "Not Required", value: "notRequired" },
];

const sortOptions = [
  { id: "all", label: "All" },
  { id: "newest", label: "Newest" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
];

const ListsHeader = () => {
  const setPropertyType = useFilterStore((state) => state.setPropertyType);
  const setRentType = useFilterStore((state) => state.setRentType);
  const setRoomsBed = useFilterStore((state) => state.setRoomsBed);
  const setPets = useFilterStore((state) => state.setPets);
  // const setPriceRange = useFilterStore(state => state.setPriceRange);

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <ScrollArea className="w-full">
          <div className="flex items-center py-1 min-w-max">
            <FilterOption
              label="Rent"
              paramName="rentType"
              options={rentOptions}
              filterSetter={setRentType}
            />
            <FilterOption
              label="Apartment"
              paramName="apartmentType"
              options={apartmentOptions}
              filterSetter={(value) => setRoomsBed(value)}
            />
            <FilterOption
              label="Property type"
              paramName="propertyType"
              options={propertyTypeOptions}
              filterSetter={setPropertyType}
            />
            <FilterOption
              label="Beds/baths"
              paramName="beds"
              options={bedsOptions}
              filterSetter={setRoomsBed}
            />
            <FilterOption
              label="Living rooms"
              paramName="livingRooms"
              options={livingRoomsOptions}
              filterSetter={() => {}}
            />
            <FilterOption
              label="Pets"
              paramName="pets"
              options={petsOptions}
              filterSetter={setPets}
            />
            <FilterOption
              label="Deposit"
              paramName="deposit"
              options={depositOptions}
              filterSetter={() => {}}
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
              <SortButton options={sortOptions} />
            </div>
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ListsHeader;
