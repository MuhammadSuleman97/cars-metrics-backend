# Car Metrics Backend
## Overview

The Car Metrics Backend is an API that interacts with Firebase Firestore to manage car data. This API provides endpoints to fetch, create, and manage car records, including functionality to import data from CSV files and export data as CSV.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
    - [Get All Cars](#get-all-cars)
    - [Create Car](#create-car)
    - [Download Cars CSV](#download-cars-csv)
    - [Upload Cars from CSV](#upload-cars-from-csv)
 
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Installation

To install the Car Metrics Backend, follow these steps:

1. Clone the repository: `git clone https://github.com/your-repo.git`
2. Navigate to the project directory: `cd car-metrics-backend`
3. Install the dependencies: `npm install`

## Configuration

Before running the Car Metrics Backend, you need to configure the following environment variables in .env file:

- `FIREBASE_API_KEY`: Your Firebase API key
- `FIREBASE_PROJECT_ID`: Your Firebase project ID
- `FIREBASE_COLLECTION_NAME`: The name of the Firestore collection to store car records
- 

## Usage

To use the Car Metrics Backend, follow these steps:

1. Start the server: `npm start`
2. Access the API endpoints using the base URL: `http://localhost:3000`

## API Endpoints

### Get All Cars

- Endpoint: `/cars`
- Method: GET
- Description: Retrieves all car records from the database.
- Response: JSON array of car objects.

### Create Car

- Endpoint: `/cars`
- Method: POST
- Description: Creates a new car record in the database.
- Request Body: JSON object containing car details.
- Response: JSON object of the created car.

### Download Cars CSV

- Endpoint: `/cars/csv`
- Method: GET
- Description: Downloads a CSV file containing all car records.
- Response: CSV file.

### Upload Cars from CSV

- Endpoint: `/cars/csv`
- Method: POST
- Description: Uploads a CSV file containing car records and adds them to the database.
- Request Body: CSV file.
- Response: JSON object with the number of records imported.

## Deployment
- Generate Dist folder from Angular project from repo https://www.github.com/MuhammadSuleman97/cars-metrics
- Add that folder in ndoe root folder
  1. Go to www.render.com
  2. Link your github account
  3. Select repository you want to deploy
  4. Configure the envirment vartiables on their website
  5. Once everything is setup, trigger the deployment
  6. You will be provided with live url 

- This project is live on address https://cars-metrics-backend.onrender.com/
## Troubleshooting

If you encounter any issues with the Car Metrics Backend, try the following troubleshooting steps:

1. Ensure that you have correctly configured the environment variables.
2. Check the console for any error messages.
3. Refer to the project's documentation for further assistance.

## License

The Car Metrics Backend is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Firebase Integration

The Car Metrics Backend integrates with Firebase Firestore to store and manage car data. Firestore is a NoSQL document database that provides real-time synchronization and offline support. By leveraging Firebase's authentication and security rules, the Car Metrics Backend ensures secure access to the car data.

To integrate Firebase Firestore with the Car Metrics Backend, follow these steps:

1. Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
2. Craete Web application from overview page and get firebase credientials
3. Add those creditials to .env 
4. Create a Firestore collection named `Cars` to store the car records.
5. Use the Firebase SDK in your backend code to interact with Firestore and perform CRUD operations on the car data.

For more information on Firebase Firestore and its features, refer to the [Firebase documentation](https://firebase.google.com/docs/firestore).
