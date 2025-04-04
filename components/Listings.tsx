"use client";

import ListingCard from "@/components/cards/ListingCard";

const listings = {
    id: 1,
    title: "Elegant 5-room apartment with spacious rooms",
    address: "Reichsratsstraße 13, 1010 Vienna",
    size: "1,300-1,300m²",
    bedrooms: "4-8 bed",
    bathrooms: "2-4 bath",
    price: {
      min: 2000,
      max: 5000,
      currency: "€"
    },
    availability: "Immediately",
    tags: ["New", "3D Tour"],
    verified: true,
    lastUpdated: "5 days ago",
    images: [
      "/images/apartment1.png",
      "/images/apartment2.png",
      "/images/apartment3.png",
      "/images/apartment4.png"
    ]
  };

const Listings = () => {
  return (
    <div className="p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Listing Card Example</h2>
      <ListingCard data={listings} />
    </div>
  );
};

export default Listings;