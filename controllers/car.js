import firebase from "../services/firebase.js";
import Car from "../models/carsModel.js";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import csvParser from "csv-parser";
import fs from "fs";
import { parse } from "json2csv";
import path from "path";
import { fileURLToPath } from "url";

const db = getFirestore(firebase);

// Determine the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CarController {
  async getCars(req, res) {
    try {
      const querySnapshot = await getDocs(collection(db, "Cars"));
      if (querySnapshot.empty) {
        return res.status(200).json([]);
      } else {
        const cars = [];
        querySnapshot.forEach((doc) => {
          const carData = doc.data();
          if (Car.validate(carData)) {
            cars.push(new Car({ id: doc.id, ...carData }));
          }
        });
        return res.status(200).json(cars);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createCar(req, res) {
    try {
      const car = req.body;
      if (!Car.validate(car)) {
        return res.status(400).json({ error: "Invalid car data" });
      }

      try {
        const docRef = await addDoc(collection(db, "Cars"), car);
        return res.status(201).json({ id: docRef.id });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async uploadCarsFromCSV(req, res) {
    try {
      const filePath = req.file?.path; // Get the file path from the request

      if (!filePath) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const cars = [];

      // Read and parse the CSV file
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
          // Convert values to numbers before validation
          for (const key in row) {
            if (!isNaN(row[key])) {
              row[key] = Number(row[key]);
            }
          }

          // Validate the row data as a car object
          if (Car.validate(row)) {
            cars.push(row);
          }
        })
        .on("end", async () => {
          try {
            // // Add valid cars to Firestore
            // for (const car of cars) {
            //   await addDoc(collection(db, "Cars"), car);
            // }

            const batch = [];
            for (const car of cars) {
              batch.push(addDoc(collection(db, "Cars"), car));
              if (batch.length === 500) {
                await Promise.all(batch);
                batch.length = 0;
              }
            }

            if (batch.length > 0) {
              await Promise.all(batch);
            }

            
            res
              .status(201)
              .json({ message: `${cars.length} cars added successfully` });
          } catch (error) {
            res.status(500).json({ error: error.message });
          } finally {
            // Delete the CSV file after processing
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(`Failed to delete file: ${err.message}`);
              } else {
                console.log(
                  `File ${path.basename(filePath)} deleted successfully.`
                );
              }
            });
          }
        })
        .on("error", (error) => {
          // Handle CSV parsing errors and delete the file
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Failed to delete file: ${err.message}`);
            }
          });

          res
            .status(500)
            .json({ error: `Failed to parse CSV file: ${error.message}` });
        });
    } catch (error) {
      // General error handling and delete the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${err.message}`);
        }
      });

      res.status(500).json({ error: error.message });
    }
  }

  async downloadCarsCSV(req, res) {
    try {
      // Fetch data from Firestore
      const querySnapshot = await getDocs(collection(db, "Cars"));
      if (querySnapshot.empty) {
        return res.status(404).send("No data found");
      }

      // Define the order of fields as per Car model
      const fieldNames = [
        "name",
        "mpg",
        "cylinders",
        "displacement",
        "horsepower",
        "weight",
        "acceleration",
        "model_year",
        "origin",
      ];

      // Convert Firestore data to JSON
      const cars = [];
      querySnapshot.forEach((doc) => {
        const carData = doc.data();
        // Exclude 'id' and maintain order as per Car model
        const car = {
          name: carData.name,
          mpg: carData.mpg,
          cylinders: carData.cylinders,
          displacement: carData.displacement,
          horsepower: carData.horsepower,
          weight: carData.weight,
          acceleration: carData.acceleration,
          model_year: carData.model_year,
          origin: carData.origin,
        };
        cars.push(car);
      });

      // Convert JSON to CSV
      const csv = parse(cars, { fields: fieldNames });

      // Define the file path and name
      const filePath = path.join(__dirname, "temp-cars.csv");

      // Write CSV to a file
      fs.writeFile(filePath, csv, (err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to write CSV file" });
        }

        // Set headers and send the file
        res.download(filePath, "cars.csv", (err) => {
          if (err) {
            return res.status(500).json({ error: "Failed to download file" });
          }

          // Delete the file after sending
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Failed to delete temp file:", err);
            }
          });
        });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CarController();
