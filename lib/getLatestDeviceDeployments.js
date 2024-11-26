// export const getLatestDeviceDeployments = async (userDevices) => {
//   return new Promise((resolve, reject) => {
//     let reducedUserDevices = {};
//     if (!userDevices || userDevices.length === 0) {
//       resolve(null);
//     }
//     else {
//       try {
//         const result = userDevices?.reduce((dict, device) => {
//           if (
//             !dict[device.deviceEUI] ||
//             dict[device.deviceEUI] < device.deploymentNumber
//           ) {
//             dict[device.deviceEUI] = device.deploymentNumber;
//           }
//           return dict;
//         }, {});
//         reducedUserDevices = {...result};
//         resolve(reducedUserDevices);
//       } catch (error) {
//         reject(error);
//       }
//     }
//   });
//  }

// export const getLatestDeviceDeployments = (userDevices) => {
//   let reducedUserDevices = {};
//   if (!userDevices || userDevices.length === 0) {
//     return null;
//   } else {
//     const result = userDevices?.reduce((dict, device) => {
//       if (
//         !dict[device.deviceEUI] ||
//         dict[device.deviceEUI] < device.deploymentNumber
//       ) {
//         //the key in the final object (dict) will be the deviceEUI and the value will be the deploymentNumber
//         dict[device.deviceEUI] = device.deploymentNumber;
//       }
//       // console.log("dict: ", dict)
//       return dict;
//     }, {});
//     reducedUserDevices = { ...result };

//     return reducedUserDevices;
//   }
// };


export const getLatestDeviceDeployments = (userDevices) => {
  if (!userDevices || userDevices.length === 0) {
    return null;
  } else {
    // First, create a map of deviceEUI to highest deploymentNumber
    const deviceDeploymentMap = userDevices.reduce((dict, device) => {
      if (!dict[device.deviceEUI] || dict[device.deviceEUI].deploymentNumber < device.deploymentNumber) {
        dict[device.deviceEUI] = device;
      }
      return dict;
    }, {});

    // Then, convert this map to an array of devices
    const latestDeviceDeployments = Object.values(deviceDeploymentMap);

    return latestDeviceDeployments;
  }
};
