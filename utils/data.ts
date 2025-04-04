export interface PriceRange {
    min: number;
    max: number;
    currency: string;
  }
  
  export interface Listing {
    id: number;
    title: string;
    address: string;
    size: string;
    bedrooms: string;
    bathrooms: string;
    price: PriceRange;
    availability: string;
    tags: string[];
    verified: boolean;
    lastUpdated: string;
    images: string[];
  }
  
  export const listings: Listing[] = [
    {
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
    },
    {
      id: 2,
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
      availability: "12-03-2024",
      tags: ["New", "3D Tour"],
      verified: true,
      lastUpdated: "5 days ago",
      images: [
        "/images/apartment2.png",
        "/images/apartment3.png",
        "/images/apartment4.png",
        "/images/apartment1.png"
      ]
    },
    {
      id: 3,
      title: "Modern apartment with stylish interior design",
      address: "Mariahilfer Straße 45, 1060 Vienna",
      size: "900-950m²",
      bedrooms: "3-4 bed",
      bathrooms: "2 bath",
      price: {
        min: 1800,
        max: 3200,
        currency: "€"
      },
      availability: "01-05-2024",
      tags: ["New", "3D Tour"],
      verified: true,
      lastUpdated: "3 days ago",
      images: [
        "/images/apartment3.png",
        "/images/apartment4.png",
        "/images/apartment1.png",
        "/images/apartment2.png"
      ]
    },
    {
      id: 4,
      title: "Luxurious penthouse with panoramic view",
      address: "Stephansplatz 8, 1010 Vienna",
      size: "2,200-2,300m²",
      bedrooms: "5-6 bed",
      bathrooms: "3-4 bath",
      price: {
        min: 7000,
        max: 9000,
        currency: "€"
      },
      availability: "15-04-2024",
      tags: ["New", "3D Tour"],
      verified: true,
      lastUpdated: "1 day ago",
      images: [
        "/images/apartment4.png",
        "/images/apartment1.png",
        "/images/apartment2.png",
        "/images/apartment3.png"
      ]
    }
  ];