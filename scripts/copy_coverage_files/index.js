const fs = require("fs");
const path = require("path");

const destinationDir = "./merged-coverage";

function copyJSONFile(dir) {
  // Ensure the destination directory exists
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }
  // Read files in the source directory
  fs.readdir(dir, (error, files) => {
    if (error) {
      console.error("Error reading source directory:", error);
      return;
    }

    const jsonFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".json"
    );

    // Copy JSON files to destination directory
    jsonFiles.forEach((file) => {
      fs.copyFile(
        path.join(dir, file),
        path.join(destinationDir, file),
        fs.constants.COPYFILE_FICLONE, // Optional flags (use fs.constants.COPYFILE_EXCL to prevent overwriting)
        (err) => {
          if (err) {
            console.error(`Error copying file ${file}:`, err);
          } else {
            console.log(`Copied file ${file} to ${destinationDir}`);
          }
        }
      );
    });
  });
}

copyJSONFile("./playwright/coverage");
copyJSONFile("./coverage");
