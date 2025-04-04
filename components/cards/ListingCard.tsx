"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VerifiedBadge from "@/components/VerifiedBadge";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { cn } from "@/lib/utils";
import 'swiper/css';
import 'swiper/css/pagination';

interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

interface Listing {
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

interface Props {
  data: Listing;
  className?: string;
}

const ListingCard = ({ data, className = "" }: Props) => {
  const isList = className.includes("flex-card");

  return (
    <Card className={cn(
      "overflow-hidden border border-gray-200", 
      isList ? "flex flex-col sm:flex-row" : "",
      className
    )}>
      {/* Image carousel with Swiper */}
      <div className={cn(
        "relative aspect-[4/3] w-full overflow-hidden",
        isList ? "sm:w-2/5" : ""
      )}>
        <Swiper
          pagination={{
            clickable: true,
            bulletClass: 'custom-bullet',
            bulletActiveClass: 'custom-bullet-active',
          }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          className="h-full w-full listing-swiper"
        >
          {data.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={`${data.title} - image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Top overlay with tags */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {data.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="bg-white text-neutral-800 hover:bg-white/90 font-medium rounded-full px-3 py-1"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Bookmark button */}
        <button 
          className="absolute top-3 right-3 bg-white p-1.5 rounded-md z-10 hover:bg-white/90 transition"
          aria-label="Save to favorites"
        >
          <Heart size={18} className="text-gray-500" />
        </button>
      </div>

      <div className={cn(
        isList ? "flex-1 flex flex-col" : ""
      )}>
        {/* Card content */}
        <CardContent className="p-4">
          {/* Verified badge and update info */}
          <div className="flex items-center justify-between mb-2">
            {data.verified && <VerifiedBadge />}
            <div className="text-xs text-gray-500">{data.lastUpdated}</div>
          </div>

          {/* Title */}
          <h3 className="font-medium text-base line-clamp-1 mb-1">{data.title}</h3>
          
          {/* Address */}
          <p className="text-sm text-gray-600 mb-4">{data.address}</p>
          
          {/* Features */}
          <div className="flex items-center gap-4 mb-3 text-gray-600">
            <div className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 22V2H20V22H4Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 7H20" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22V7" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs">{data.size}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 22V8C2 6.34315 3.34315 5 5 5H19C20.6569 5 22 6.34315 22 8V22H2Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 22V19H22V22H2Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5V2M12 2H9M12 2H15" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 12H9M15 12H19" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs">{data.bedrooms}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 22V13H22V22H2Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 13V7.5C2 5.01472 4.01472 3 6.5 3C7.83563 3 9.04513 3.58748 9.87413 4.52847C10.3596 4.18049 10.9376 4 11.5625 4C12.1874 4 12.7654 4.18049 13.2509 4.52847C14.0799 3.58748 15.2894 3 16.625 3C19.1103 3 21.125 5.01472 21.125 7.5V13" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 11C7.32843 11 8 10.3284 8 9.5C8 8.67157 7.32843 8 6.5 8C5.67157 8 5 8.67157 5 9.5C5 10.3284 5.67157 11 6.5 11Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 11C18.3284 11 19 10.3284 19 9.5C19 8.67157 18.3284 8 17.5 8C16.6716 8 16 8.67157 16 9.5C16 10.3284 16.6716 11 17.5 11Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs">{data.bathrooms}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 mt-auto">
          {/* Price */}
          <div className="w-full">
            <div className="text-lg font-semibold mb-1">
              {data.price.currency} {data.price.min.toLocaleString()} - {data.price.max.toLocaleString()}
            </div>
            
            {/* Availability */}
            <div className="text-xs text-gray-600">
              Available From: {data.availability}
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ListingCard;