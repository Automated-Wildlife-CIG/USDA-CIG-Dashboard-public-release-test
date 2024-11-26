//TODO: When user closes info window, how do we want the map to recenter? On the last selected marker's center cords or the orginal starting bounds?

/* 

***WHY IS THE INFO WINOW ENCAPSULATED IN ITS OWN COMPONENT?***

The useGoogleMap hook from @react-google-maps/api needs to be used inside a component that is a child of GoogleMap. This is because the hook uses the React context API to access the google.maps.Map instance, which is provided by the GoogleMap component.

In this case, the DeviceMapInfoWindow component is a child of GoogleMap (assuming DeviceMapInfoWindow is used inside a GoogleMap component somewhere else in your code), so it can use the useGoogleMap hook to access the google.maps.Map instance.

useGoogleMap hook is used to access the google.maps.Map instance. The google.maps.Map instance is used to set the center of the map when the InfoWindow is closed.

*/

"use client";

import { InfoWindow, useGoogleMap } from "@react-google-maps/api";

import { useDashboardContext } from "@/context/DashboardContext";

export default function DeviceMapInfoWindow({
  setCenter,
  showMarkerInfo,
  hoveredMarker,
}) {
  const { selectedDevice, selectedDeviceSetter } =
    useDashboardContext();

  const map = useGoogleMap();

  return (
    <>
      {hoveredMarker ? (
        <InfoWindow
          position={hoveredMarker.centerCords}
          onCloseClick={() => {
            console.log(
              "selected marker center cords",
              hoveredMarker.centerCords,
            );
            setCenter(hoveredMarker.centerCords);
          }}
        >
          <div className="max-w-xs rounded bg-white p-4 text-blue-500 shadow-md">
            <div className="mb-2">
              <h5 className="text-lg font-semibold">
                Project: {hoveredMarker?.projectName}
              </h5>
              <p className="text-sm">Device EUI: {hoveredMarker?.deviceEUI}</p>
              <p className="text-sm">
                Deployment Number: {hoveredMarker?.deploymentNumber}
              </p>
            </div>
            {/* <div className="mb-4">
              <h5 className="text-sm font-semibold">Project Description:</h5>
              <p className="text-sm">{hoveredMarker?.projectDescription}</p>
            </div>
            <div className="mb-4">
              <h5 className="text-sm font-semibold">{hoveredMarker?.type}</h5>
              <p className="text-sm">{hoveredMarker?.taxonomyDesc}</p>
            </div> */}
          </div>
        </InfoWindow>
      ) : null}
    </>
  );
}
