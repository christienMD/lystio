"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, Eye, Pencil, Map as MapIcon } from "lucide-react";
import Map, { MapRef, Marker, Popup, NavigationControl } from "react-map-gl/mapbox";

import { useMapListings } from "@/hooks/useMapListings";
import { useListings } from "@/hooks/useListings";
import useFilterStore from "@/stores/useFiltereStore";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

interface Props {
  selectedListingId?: number;
  onSelectListing?: (id: number) => void;
}

interface MapCluster {
  count: number;
  pt: [number, number];
  ids: number[];
  bbox: [[number, number], [number, number]] | null;
  isidentical: boolean;
  unitType: string;
  unitCount: string;
  isVisited: boolean;
  rentRange: [number, number];
  rentPerRange: [number | null, number | null];
}


const MapboxListing = ({ selectedListingId, onSelectListing }: Props) => {
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null);
  
  const mapRef = useRef<MapRef>(null);
  
  const filters = useFilterStore(state => state.filters);
  
  const { data: mapData, isLoading: isMapLoading } = useMapListings(filters);
  const { data: listingsData, isLoading: isListingsLoading } = useListings(filters);
  
  const mapClusters = Array.isArray(mapData) ? mapData : [];
  const listings = listingsData?.res || [];
  
  const listingsById: Record<number, any> = {};
  listings.forEach(listing => {
    listingsById[listing.id] = listing;
  });

  useEffect(() => {
    if (!selectedListingId) {
      setPopupInfo(null);
      return;
    }
    
    const selected = listings.find(listing => listing.id === selectedListingId);
    if (selected) {
      setPopupInfo(selected);
      
      const cluster = mapClusters.find(cluster => 
        cluster.ids.includes(selectedListingId)
      );
      
      if (cluster && mapRef.current) {
        mapRef.current.flyTo({
          center: [cluster.pt[0], cluster.pt[1]],
          zoom: 15,
          duration: 800
        });
      }
    }
  }, [selectedListingId, listings, mapClusters]);

  useEffect(() => {
    if (!mapClusters.length || !mapRef.current) return;
    
    try {
      const bounds = mapClusters.reduce(
        (acc, cluster) => {
          const [lng, lat] = cluster.pt;
          return {
            west: Math.min(acc.west, lng),
            south: Math.min(acc.south, lat),
            east: Math.max(acc.east, lng),
            north: Math.max(acc.north, lat),
          };
        },
        { west: 180, south: 90, east: -180, north: -90 }
      );
      
      const sw = [bounds.west - 0.02, bounds.south - 0.02];
      const ne = [bounds.east + 0.02, bounds.north + 0.02];
      
      mapRef.current.fitBounds([sw, ne] as [[number, number], [number, number]], {
        padding: 50,
        duration: 1000
      });
    } catch (error) {
      console.error("Error setting map bounds:", error);
    }
  }, [mapClusters]);

  const formatPrice = (listing: any) => {
    if (listing.rent) {
      return `€${listing.rent.toLocaleString()} - €${(listing.rent * 1.2).toLocaleString()}`;
    }
    return "Price on request";
  };

  const formatPriceRange = (rentRange: [number, number]): string => {
    if (!rentRange || rentRange.length !== 2) return "?";
    
    if (rentRange[0] === 0 && rentRange[1] > 0) {
      return `€${rentRange[1].toLocaleString()}`;
    }
    
    if (rentRange[0] === rentRange[1] && rentRange[0] > 0) {
      return `€${rentRange[0].toLocaleString()}`;
    }
    
    if (rentRange[0] > 0 && rentRange[1] > 0) {
      return `€${rentRange[0].toLocaleString()}`;
    }
    
    return "?";
  };

  const handleMarkerClick = (cluster: MapCluster) => {
    if (cluster.count === 1 && cluster.ids.length === 1) {
      if (onSelectListing) {
        onSelectListing(cluster.ids[0]);
      }
    } 
    else if (mapRef.current) {
      if (cluster.bbox) {
        const [[west, south], [east, north]] = cluster.bbox;
        mapRef.current.fitBounds(
          [[west, south], [east, north]] as [[number, number], [number, number]],
          { padding: 100, duration: 600 }
        );
      } 
      else {
        mapRef.current.flyTo({
          center: [cluster.pt[0], cluster.pt[1]],
          zoom: Math.min((mapRef.current.getZoom() || 10) + 2, 16),
          duration: 600
        });
      }
    }
  };

  return (
    <div className="w-full h-full relative">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: 16.3738,
          latitude: 48.2082,
          zoom: 13,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
      >
        <NavigationControl position="bottom-right" />
        
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          <button className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100 transition-colors">
            <MapPin className="w-5 h-5 text-gray-700" />
            <span className="sr-only">Point of interest</span>
          </button>
          
          <button className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100 transition-colors">
            <Pencil className="w-5 h-5 text-gray-700" />
            <span className="sr-only">Draw</span>
          </button>
        </div>
        
        <div className="absolute bottom-3 left-3 z-10 flex gap-2">
          <button className="bg-white py-2 px-3 rounded-md shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm font-medium">
            <Eye className="w-4 h-4 text-gray-700" />
            <span>Streetview</span>
          </button>
          
          <button className="bg-white py-2 px-3 rounded-md shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm font-medium">
            <MapIcon className="w-4 h-4 text-gray-700" />
            <span>Route planner</span>
          </button>
        </div>
        
        {mapClusters.map((cluster, index) => {
          const [lng, lat] = cluster.pt;
          const isSelected = selectedListingId && cluster.ids.includes(selectedListingId);
          const isCluster = cluster.count > 1;
          const isHovered = hoveredMarkerId === index;
          
          return (
            <Marker
              key={`cluster-${index}`}
              longitude={lng}
              latitude={lat}
              anchor="center"
            >
              <div 
                className={`
                  ${isCluster ? 'bg-gray-100 text-gray-900 min-w-[30px] text-center' : 'bg-white'} 
                  px-2 py-1 rounded-full shadow-md text-sm font-semibold cursor-pointer 
                  ${isSelected ? 'bg-blue-100' : 'hover:bg-blue-50'} 
                  transition-colors
                `}
                onClick={() => handleMarkerClick(cluster)}
                onPointerEnter={() => setHoveredMarkerId(index)}
                onPointerLeave={() => setHoveredMarkerId(null)}
              >
                {isCluster ? (
                  cluster.count
                ) : (
                  formatPriceRange(cluster.rentRange)
                )}
              </div>
              
              {isHovered && !isCluster && cluster.ids.length === 1 && !popupInfo && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 z-10">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {cluster.ids[0] && listingsById[cluster.ids[0]]?.media?.[0]?.cdnUrl && (
                      <div className="h-32 bg-gray-200">
                        <img 
                          src={listingsById[cluster.ids[0]].media[0].cdnUrl}
                          alt="Property Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-3">
                      <div className="font-semibold text-base mb-1 truncate">
                        {cluster.ids[0] && listingsById[cluster.ids[0]]?.title || "Property"}
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2 truncate">
                        {cluster.ids[0] && listingsById[cluster.ids[0]]?.address || ""}, 
                        {cluster.ids[0] && listingsById[cluster.ids[0]]?.zip || ""} 
                        {cluster.ids[0] && listingsById[cluster.ids[0]]?.city || ""}
                      </div>
                      
                      <div className="flex gap-3 mb-2">
                        <div className="text-xs">
                          {cluster.ids[0] && listingsById[cluster.ids[0]]?.size || "-"} m²
                        </div>
                        
                        <div className="text-xs">
                          {cluster.ids[0] && listingsById[cluster.ids[0]]?.roomsBed || "-"} bed
                        </div>
                        
                        <div className="text-xs">
                          {cluster.ids[0] && listingsById[cluster.ids[0]]?.roomsBath || "-"} bath
                        </div>
                      </div>
                      
                      <div className="font-bold text-sm">
                        {formatPriceRange(cluster.rentRange)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Marker>
          );
        })}
        
        {popupInfo && (
          <Popup
            longitude={mapClusters.find(c => c.ids.includes(popupInfo.id))?.pt[0] || 0}
            latitude={mapClusters.find(c => c.ids.includes(popupInfo.id))?.pt[1] || 0}
            anchor="bottom"
            closeButton={false}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
            className="property-popup"
            maxWidth="300px"
          >
            <div className="rounded-lg overflow-hidden">
              <div className="relative h-36 bg-gray-200">
                <img 
                  src={popupInfo.media?.[0]?.cdnUrl || "/images/property-placeholder.jpg"}
                  alt={popupInfo.title || "Property"} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-3 bg-white">
                <h3 className="font-semibold text-lg mb-1 truncate">{popupInfo.title || "Property"}</h3>
                <p className="text-sm text-gray-600 mb-2 truncate">{popupInfo.address || ""}, {popupInfo.zip || ""} {popupInfo.city || ""}</p>
                
                <div className="flex gap-4 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">{popupInfo.size || "-"} m²</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">{popupInfo.roomsBed || "-"} bed</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">{popupInfo.roomsBath || "-"} bath</span>
                  </div>
                </div>
                
                <div className="font-bold">{formatPrice(popupInfo)}</div>
              </div>
            </div>
          </Popup>
        )}
      </Map>
      
      {(isMapLoading || isListingsLoading) && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="text-gray-700">Loading map...</div>
        </div>
      )}
      
      <style jsx global>{`
        .property-popup .mapboxgl-popup-content {
          padding: 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .property-popup .mapboxgl-popup-tip {
          border-top-color: white;
        }
      `}</style>
    </div>
  );
};

export default MapboxListing;