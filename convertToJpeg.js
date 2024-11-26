const fs = require("fs");

// Read the data from the file
fs.readFile("rawDataConverted.txt", "utf8", (err, data) => {
  if (err) throw err;

  // Parse the data into an array of arrays
  let arrays = JSON.parse(data);

  if (
    !Array.isArray(arrays) ||
    !arrays.every((array) => Array.isArray(array))
  ) {
    console.error("Invalid data format");
    return;
  }

  // Flatten the array of arrays into a single array
  let flatArray = [].concat(...arrays);

  // Convert the array into a Buffer
  let buffer = Buffer.from(flatArray);

  // Write the buffer to a file with a .jpeg extension
  fs.writeFile("output.jpeg", buffer, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
});
