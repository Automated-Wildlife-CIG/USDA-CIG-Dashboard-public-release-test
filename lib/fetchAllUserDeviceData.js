/* get all of the user device data to populate the ManageDeviceForm */

export default async function fetchAllUserDeviceData(userId) {
  try {
    const res = await fetch(`/api/manage-device-data?userId=${userId} `);
    if (!res.ok) {
      throw new Error("Failed to fetch any user device data from API.");
    }
    const deviceData = await res.json();
    return deviceData;
  } catch (error) {
    throw new Error("Failed to fetch any user device data");
  }
}
