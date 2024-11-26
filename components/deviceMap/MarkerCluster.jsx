import { useEffect, useState } from "react";
import { Marker, MarkerClusterer, useGoogleMap } from "@react-google-maps/api";
import { useDashboardContext } from "@/context/DashboardContext";

export default function MarkerCluster({
  setShowMarkerInfo,
  setHoveredMarker,
  hoveredMarker,
}) {
  const {
    userDevices,
    latestDeviceDeployments,
    selectedDevice,
    selectedDeviceSetter,
    showActiveDevicesOnly,
    mapViewCenterSetter,
    triggerMapReDraw,
    mapView,
  } = useDashboardContext();

  const [mapViewDevices, setMapViewDevices] = useState(() => {
    if (userDevices) {
      return [...userDevices];
    }
  });

  const map = useGoogleMap();

  const handleMarkerClick = async (deviceData) => {
    if (!deviceData) {
      console.error("No device data found for the selected marker");
      return;
    }

    if (deviceData !== selectedDevice || !selectedDevice) {
      selectedDeviceSetter(deviceData);
      mapViewCenterSetter(deviceData.centerCords);
    } //  On marker click show InfoWindow}
  };

  //determine which markers(devices) to display on map
  let devicesToDisplay;
  if (showActiveDevicesOnly) {
    if (latestDeviceDeployments) {
      devicesToDisplay = [...latestDeviceDeployments];
    }
  } else {
    if (userDevices) {
      devicesToDisplay = [...userDevices];
    }
  }

  useEffect(() => {
    if (mapView === "all-devices") {
      const bounds = new window.google.maps.LatLngBounds();
      userDevices.forEach((device) => {
        bounds.extend(device.centerCords);
      });

      map.fitBounds(bounds);
      setMapViewDevices([...userDevices]);
    }

    if (mapView === "current-device") {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(selectedDevice.centerCords);
      map.fitBounds(bounds);
      // map.setCenter(selectedDevice.centerCords);
      map.setZoom(10);
      setMapViewDevices([selectedDevice]);
    }

    if (mapView === "active-devices") {
      const bounds = new window.google.maps.LatLngBounds();
      latestDeviceDeployments.forEach((device) => {
        bounds.extend(device.centerCords);
      });

      map.fitBounds(bounds);
      setMapViewDevices([...latestDeviceDeployments]);
    }
  }, [mapView, selectedDevice, userDevices, triggerMapReDraw]);

  return (
    <MarkerClusterer
      options={{
        calculator: function (markers, numStyles) {
          if (!latestDeviceDeployments) {
            return {
              text: markers.length,
              index: 0,
            };
          }

          let index = 0;
          const count = markers.length;
          let dv = count;
          while (dv !== 0) {
            dv = parseInt(dv / 10, 10);
            index++;
          }

          index = Math.min(index, numStyles);
          //BUG: Cannot read properties of undefined (reading 'split'), line 105

          // Check if any of the markers in the cluster is active (by active we mean deployed?)
          const hasActiveMarker = markers.some((marker) => {
            const title = marker.getTitle();
            if (!title) {
              return false; // Skip this marker if its title is undefined
            }

            //parts[0] is the deviceEUI and parts[1] is the deployment number
            //update this for the new latestDeviceDeployments object
            const parts = title.split("_");
            return latestDeviceDeployments[parts[0]] === parseInt(parts[1]);
          });

          return {
            text: count,
            index: hasActiveMarker ? index + numStyles : index, // Use a different style for clusters with an active marker
          };
        },
      }}
    >
      {(clusterer) =>
        mapViewDevices?.map((userDevice, idx) => {
          const isActive = latestDeviceDeployments?.some(
            (device) =>
              device.deviceEUI === userDevice.deviceEUI &&
              device.deploymentNumber === userDevice.deploymentNumber,
          );

          let iconImage = isActive
            ? "/images/marker-icons/bird-active.png"
            : "/images/marker-icons/bird-inactive.png";

          return (
            <Marker
              key={idx}
              position={userDevice.centerCords}
              clusterer={clusterer}
              averageCenter={true}
              title={`Device: ${userDevice.deviceEUI} | Deployment: ${userDevice.deploymentNumber}`}
              icon={`${iconImage}`}
              onClick={() => {
                handleMarkerClick(userDevice);
              }}
              onMouseOver={() => {
                // console.log("map mouseover");
                // setShowMarkerInfo(prev => !prev);
                setHoveredMarker(userDevice);
              }}
              onMouseOut={() => {
                // console.log(
                //   "map mouseout hovered marker state: ",
                //   hoveredMarker,
                // );
                setHoveredMarker(null);
              }}
            />
          );
        })
      }
    </MarkerClusterer>
  );
}
