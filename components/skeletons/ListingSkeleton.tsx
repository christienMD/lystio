"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  count?: number;
  viewType?: "grid" | "list" | "compact";
}

const ListingSkeleton = ({ count = 4, viewType = "grid" }: SkeletonProps) => {
  const isList = viewType === "list";

  const getGridLayout = () => {
    switch (viewType) {
      case "grid":
        return "grid-cols-1 xs:grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6";
      case "list":
        return "grid-cols-1 gap-4";
      case "compact":
        return "grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 gap-3";
      default:
        return "grid-cols-1 md:grid-cols-2 gap-6";
    }
  };

  return (
    <div className={`grid ${getGridLayout()}`}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Card
            key={index}
            className={cn(
              "overflow-hidden border border-gray-200",
              isList ? "flex flex-col sm:flex-row" : ""
            )}
          >
            {/* Image skeleton */}
            <div
              className={cn(
                "relative aspect-[4/3] w-full overflow-hidden",
                isList ? "sm:w-2/5" : ""
              )}
            >
              <Skeleton height="100%" />

              {/* Tags skeleton */}
              <div className="absolute top-3 left-3 right-12 flex flex-wrap gap-2 z-10 max-w-[calc(100%-60px)]">
                <Skeleton width={60} height={24} borderRadius={20} />
                <Skeleton width={70} height={24} borderRadius={20} />
              </div>

              {/* Bookmark button skeleton */}
              <div className="absolute top-3 right-3 z-10">
                <Skeleton width={28} height={28} borderRadius={6} />
              </div>
            </div>

            <div className={cn(isList ? "flex-1 flex flex-col" : "")}>
              {/* Card content */}
              <CardContent className="p-4">
                {/* Verified badge and update info */}
                <div className="flex items-center justify-between mb-2">
                  <Skeleton width={80} height={16} />
                  <Skeleton width={100} height={14} />
                </div>

                {/* Title */}
                <div className="mb-1">
                  <Skeleton width="80%" height={20} />
                </div>

                {/* Address */}
                <div className="mb-4">
                  <Skeleton width="90%" height={16} />
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 mb-3">
                  <Skeleton width={40} height={16} />
                  <Skeleton width={40} height={16} />
                  <Skeleton width={40} height={16} />
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 mt-auto">
                {/* Price */}
                <div className="w-full">
                  <div className="mb-1">
                    <Skeleton width={140} height={24} />
                  </div>

                  {/* Availability */}
                  <div>
                    <Skeleton width={180} height={14} />
                  </div>
                </div>
              </CardFooter>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default ListingSkeleton;