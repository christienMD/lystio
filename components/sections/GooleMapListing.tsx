"use client";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

type MapType = google.maps.Map;

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 48.2082,
  lng: 16.3738,
};

const GoogleMapListing = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_map, setMap] = useState<MapType | null>(null);

  const onLoad = useCallback(function callback(map: MapType) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  if (!isLoaded) return <div className="w-full h-full flex items-center justify-center">Loading map...</div>;

  return (
    // Make the parent div take full height of its container
    <div className="w-full h-full min-h-[calc(100vh-200px)]">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: true,
        }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  );
};

export default GoogleMapListing;