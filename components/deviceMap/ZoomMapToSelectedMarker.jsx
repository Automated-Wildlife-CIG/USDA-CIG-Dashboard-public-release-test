import { useDashboardContext } from "@/context/DashboardContext";
import { Locate } from "lucide-react";

import ToolTipComponent from "../ui/custom/ToolTipComponent";

export default function ZoomMapToSelectedMarker() {
  const { mapViewCenterSetter, selectedDevice,  setTriggerMapReDraw, mapViewSetter } =
    useDashboardContext();

  const handleZoom = () => {
    if (selectedDevice?.centerCords) {
      mapViewCenterSetter(selectedDevice.centerCords);
      setTriggerMapReDraw((prev) => prev + 1);
      mapViewSetter("current-device");
    }
  };

  return (
    <ToolTipComponent
      content="Zoom to current selected device"
      id="active-only-btn"
      onClick={handleZoom}
    >
      <Locate size={18} />
    </ToolTipComponent>
  );
}
