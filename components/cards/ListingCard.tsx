"use client";

import Image from "next/image";
import { Bookmark } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import VerifiedBadge from "@/components/VerifiedBadge";
import { formatDate } from "@/lib/utils";
import { Listing } from "@/entities/Listing";

interface Props {
  data: Listing;
  className?: string;
  id?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const ListingCard = ({
  data,
  className = "",
  id,
  onClick,
  isSelected = false,
}: Props) => {
  const isList = className.includes("flex-card");

  const images =
    data.media && data.media.length > 0
      ? data.media.filter((m) => m.type === "photo").map((m) => m.cdnUrl)
      : ["/images/apartment1.png"];

  const formattedAddress = `${data.address || ""}, ${data.zip || ""} ${
    data.city || ""
  }`.trim();

  const getPrice = () => {
    if (data.rentRange && data.rentRange.length === 2) {
      return `€ ${data.rentRange[0].toLocaleString()} - ${data.rentRange[1].toLocaleString()}`;
    } else if (data.rent && data.rent > 0) {
      return `€ ${data.rent.toLocaleString()}`;
    } else {
      return "No price range available";
    }
  };

  const availability =
    data.availableFromText ||
    (data.availableFrom ? formatDate(data.availableFrom) : "Immediately");

  return (
    <Card
      id={id}
      className={cn(
        "overflow-hidden border border-gray-200 transition-all duration-200",
        isList ? "flex flex-col sm:flex-row" : "",
        isSelected ? "ring-2 ring-gray-300 ring-offset-1" : "",
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
    >
      {/* Image carousel with Swiper */}
      <div
        className={cn(
          "relative aspect-[4/3] w-full overflow-hidden",
          isList ? "sm:w-2/5" : ""
        )}
      >
        <Swiper
          pagination={{
            clickable: true,
            bulletClass: "custom-bullet",
            bulletActiveClass: "custom-bullet-active",
            dynamicBullets: true,
            dynamicMainBullets: 5,
          }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="h-full w-full listing-swiper"
        >
          {images.map((image, index) => (
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
        <div className="absolute top-3 left-3 right-12 flex flex-wrap gap-2 z-10 max-w-[calc(100%-60px)]">
          {(data.tags || []).slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-white text-neutral-800 text-xs hover:bg-white/90 font-medium rounded-full px-2 py-0.5 mb-1"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Bookmark button */}
        <button
          className="absolute top-3 right-3 bg-white p-1.5 rounded-md z-10 hover:bg-white/90 transition"
          aria-label="Save to favorites"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Bookmark size={18} className="text-gray-500" />
        </button>
      </div>

      <div className={cn(isList ? "flex-1 flex flex-col" : "")}>
        {/* Card content */}
        <CardContent className="p-4">
          {/* Verified badge and update info */}
          <div className="flex items-center justify-between mb-2">
            {data.verified && <VerifiedBadge />}
            <div className="text-xs text-gray-500">
              {formatDate(data.updatedAt)}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-medium text-base line-clamp-1 mb-1">
            {data.title}
          </h3>

          {/* Address */}
          <p className="text-sm text-gray-600 mb-4">{formattedAddress}</p>

          {/* Features */}
          <div className="flex items-center gap-4 mb-3 text-gray-600">
            <div className="flex items-center gap-1.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 22V2H20V22H4Z"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 7H20"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22V7"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs">{data.size} m²</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 22V8C2 6.34315 3.34315 5 5 5H19C20.6569 5 22 6.34315 22 8V22H2Z"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 22V19H22V22H2Z"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5V2M12 2H9M12 2H15"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 12H9M15 12H19"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs">{data.roomsBed || "-"}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 22V13H22V22H2Z"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 13V7.5C2 5.01472 4.01472 3 6.5 3C7.83563 3 9.04513 3.58748 9.87413 4.52847C10.3596 4.18049 10.9376 4 11.5625 4C12.1874 4 12.7654 4.18049 13.2509 4.52847C14.0799 3.58748 15.2894 3 16.625 3C19.1103 3 21.125 5.01472 21.125 7.5V13"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.5 11C7.32843 11 8 10.3284 8 9.5C8 8.67157 7.32843 8 6.5 8C5.67157 8 5 8.67157 5 9.5C5 10.3284 5.67157 11 6.5 11Z"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.5 11C18.3284 11 19 10.3284 19 9.5C19 8.67157 18.3284 8 17.5 8C16.6716 8 16 8.67157 16 9.5C16 10.3284 16.6716 11 17.5 11Z"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs">{data.roomsBath || "-"}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          {/* Price */}
          <div className="w-full">
            <div className="text-lg font-semibold mb-1">{getPrice()}</div>

            {/* Availability */}
            <div className="text-xs text-gray-600">
              Available From: {availability}
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ListingCard;
