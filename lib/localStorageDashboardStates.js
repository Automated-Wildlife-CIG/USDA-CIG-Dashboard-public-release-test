//TODO: add check for window object in each function

// This clears the values for all keys, no return value
export const initializeDashboardStorage = () => {
  const myMap = new Map();
  myMap.set("userDevices", []);
  myMap.set("senSurfData", []);
  myMap.set("selectedDevice", {});
  myMap.set("dataPlot", {});
  myMap.set("latestDeviceDeployments", {});
  myMap.set("showActiveDeviceMarkers", false);
  myMap.set("showSelectedDeviceInfo", false);

  let jsonStringToStore = JSON.stringify(Array.from(myMap.entries()));

  try {
    localStorage.setItem("dashboardStates", jsonStringToStore);
  } catch (error) {
    console.error("Error setting localStorage", error);
  }
};

// This returns the state passed in argument
export const getDashboardStatesStorageByState = (dashboardStateKey) => {
  let retrievedJsonString = localStorage.getItem("dashboardStates");

  let retrievedJsonMap = new Map(JSON.parse(retrievedJsonString));

  //check if key exists in retrievedJsonMap, if not, do not set
  if (!retrievedJsonMap.has(dashboardStateKey)) {
    //TODO: handle this error
    // console.log("key does not exist in local storage");
    return;
  }

  return retrievedJsonMap.get(dashboardStateKey);
};

// This updates a state in storage, no return value
export const updateDashboardStateStorage = (
  dashboardStateKey,
  dashboardStateValue,
) => {
  //get storage based on key
  let retrievedJsonString = localStorage.getItem("dashboardStates");

  //if exists, convert to map
  let retrievedJsonMap = new Map(JSON.parse(retrievedJsonString));

  //check if key exists in retrievedJsonMap, if not, do not set
  if (!retrievedJsonMap.has(dashboardStateKey)) {
    //TODO: handle this error
    // console.log(`key ${dashboardStateKey} does not exist in local storage`);
    return;
  }

  //set key and value on map
  retrievedJsonMap.set(dashboardStateKey, dashboardStateValue);

  //convert map to string for storage
  let jsonStringToStore = JSON.stringify(
    Array.from(retrievedJsonMap.entries()),
  );

  //store updated map
  localStorage.setItem("dashboardStates", jsonStringToStore);
};
