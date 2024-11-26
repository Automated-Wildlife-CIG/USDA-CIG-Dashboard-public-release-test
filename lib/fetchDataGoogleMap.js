export default async function fetchData(userId, firstName) {
  // console.log('fetchDataGoogleMap.js fetchData() userId', userId);
  // console.log('fetchDataGoogleMap.js fetchData() firstName', firstName);

  try {
    const res = await fetch(
      `/api/user-device-data?userId=${userId}&firstName=${firstName}`
    );
    if (!res.ok) {
      // If the response is not ok, throw an error with the status text
      throw new Error(res.statusText);
    }
    const json = await res.json();

    // console.log('user device list returned by api', json.userDeviceData)
    // Passes an array of objects for each device and deployment number
    return json.userDeviceData;
  } catch (error) {
    // Log the error message for debugging purposes
    console.error(error.message);
    // Return a generic error message to the caller
    throw new Error("An unexpected error occurred. Please try again later.");
  }
}
