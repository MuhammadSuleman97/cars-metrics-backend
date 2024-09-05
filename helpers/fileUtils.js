import fs from 'fs';
import path from 'path';

// Function to clear a directory
export const clearDirectory = (directoryPath) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Failed to list files in ${directoryPath}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file ${file}:`, err);
        } else {
          console.log(`Deleted file: ${file}`);
        }
      });
    });
  });
};
