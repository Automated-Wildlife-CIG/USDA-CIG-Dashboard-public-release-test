// Some varibable names have changed:
// deviceDict has become latestDeviceDeployments
// deviceData has become userDevices
//where filteredData is declared, 'data' has is replaced with 'userDevices'

//Removed selectedDevice state from this componenet and moved to DashboardContext so that it can be used in other components

//Moved infoWindow to a separate component Googlem.jsx

//TODO: move latestDeviceDeployments to DashboardContext

"use client";
import { useEffect, useState, useRef } from "react";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useDashboardContext } from "@/context/DashboardContext";
import { useTheme } from "next-themes";
import { mapDarkStyles } from "@/lib/googleMapStyles";
import MarkerCluster from "@/components/deviceMap/MarkerCluster";

export default function DeviceMap() {
  const [showMarkerInfo, setShowMarkerInfo] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const {
    userDevices,
    selectedDevice,
    mapViewCenter,
    mapViewCenterSetter,
    latestDeviceDeployments,
    showActiveDevicesOnly,
  } = useDashboardContext();

  const { systemTheme } = useTheme();

  //wait to load map until google maps api is loaded
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  useEffect(() => {
    if (selectedDevice) {
      mapViewCenterSetter(selectedDevice.centerCords);
    }
  }, [selectedDevice, mapViewCenter]);

  const mapRef = useRef();

  useEffect(() => {
    if (!mapRef.current || !latestDeviceDeployments || !userDevices) return;

    const bounds = new window.google.maps.LatLngBounds();

    if (showActiveDevicesOnly) {
      latestDeviceDeployments.forEach((device) => {
        if (device.centerCords) {
          bounds.extend(device.centerCords);
        }
      });
    }

    if (!showActiveDevicesOnly) {
      userDevices.forEach((device) => {
        if (device.centerCords) {
          bounds.extend(device.centerCords);
        }
      });
    }

    mapRef.current.fitBounds(bounds);
  }, [showActiveDevicesOnly]);

  // Removed useMemo to memoize the center and options objects. Since these objects are static and don't depend on any changing values, there's no real benefit to using useMemo here. The computation to create these objects is not expensive, and they're not going to change over the life of the component.
  // const center = { lat: 48.27718, lng: -98.049 };

  let options = {
    disableDefaultUI: true,
    zoomControl: true,
    clickableIcons: false,
    styles: mapDarkStyles,
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  // When GoogleMap loads adjust bounds to see all markers
  const handleOnLoad = async (map) => {
    mapRef.current = map;
    try {
      // const dataArr = await fetchData(userId, firstName);
      const bounds = new google.maps.LatLngBounds();
      userDevices?.map((deviceData) => {
        bounds.extend(deviceData?.centerCords);
      });
      map.fitBounds(bounds);
    } catch (error) {
      console.error("Error Setting map bounds:", error);
    }
  };

  if (!isLoaded)
    return (
      <div className="flex w-full justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2">
            <p>Devices loading</p>
          </div>
        </div>
      </div>
    );

  return (
    <>
      {isLoaded && (
        <div className="flex h-full w-full flex-col ">
          <GoogleMap
            zoom={3}
            center={mapViewCenter}
            mapContainerStyle={containerStyle}
            options={options}
            onLoad={handleOnLoad}
          >
            <MarkerCluster
              setShowMarkerInfo={setShowMarkerInfo}
              setHoveredMarker={setHoveredMarker}
              hoveredMarker={hoveredMarker}
            />
          </GoogleMap>
        </div>
      )}
    </>
  );
}
