import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useDashboardContext } from "@/context/DashboardContext";

export default function ToggleActiveDeviceMarkers() {
  const {
    showActiveDevicesOnly,
    showActiveDevicesOnlySetter,
    mapView,
    mapViewSetter,
    
  } = useDashboardContext();

  const toggleShowActiveDeviceMarkers = () => {
    if (mapView === "all-devices" || mapView === "current-device") {
      mapViewSetter("active-devices");
    } else {
      if (mapView === "active-devices" || mapView === "current-device") {
        mapViewSetter("all-devices");
      }
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="bg-gray-500 text-sm w-50 hover:bg-blue-500 text-white py-1 px-2 rounded"
          id="active-only-btn"
          onClick={toggleShowActiveDeviceMarkers}
        >
          {!showActiveDevicesOnly ? "Show Active Only" : "Show All Devices"}
        </TooltipTrigger>
        <TooltipContent>
          {/* {!showActiveDevicesOnly
            ? "Show only deployed devices"
            : "Show All Devices"} */}
          click
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
