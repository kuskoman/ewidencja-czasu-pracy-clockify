# Clockify Work Time Record

A simple application for automating the filling of work time records using Clockify reports in CSV file form.

**[Polish version of README file](./README.pl.md)**

## Installation

Both the frontend and backend of the application are written in TypeScript using the Yarn package manager. To install the dependencies, run the following commands:

```sh
cd frontend/ && yarn --frozen-lockfile
```

```sh
# from the main project directory, use cd ../backend if you are in the frontend/ directory
cd backend/ && yarn --frozen-lockfile
```

## Running

To run the application, run the following commands:

```sh
cd backend/ && yarn start:dev
```

```sh
cd frontend/ && yarn start
```

These commands will run the application in development mode.

## Running with Docker

### Frontend

```sh
docker build -t clockify-work-time-record-frontend -f frontend/Dockerfile ./frontend
```

```sh
docker build -t clockify-work-time-record-backend -f backend/Dockerfile ./backend
```

### Backend

To run the application, run the following commands:

```sh
docker run -p 3000:3000 -d clockify-work-time-record-backend
```

```sh
docker run -p 4200:4200 -d clockify-work-time-record-backend
```

## Deploying to a Kubernetes Cluster using Helm

The application contains Helm configuration files that allow you to automatically deploy the application to a Kubernetes cluster. To install the application, run the following command:

```sh
helm upgrade --install -n ewidencja-clockify ewidencja-clockify ./chart
```

## Export the appropriate CSV file

The application requires a CSV file with the following structure:

```csv
"Date","Time (h)","Time (decimal)"
```

With data for the entire month. To export the appropriate file, follow these steps:

1. Log in to Clockify
2. Go to the "Reports" tab
3. Select the "Summary" tab from the top navigation bar
4. In the upper right corner, select the 'Last month' period (or another, if you want to fill the work time record for another month)
5. In the lower part of the screen, select "Broup by" -> "Date", and (None)
6. In the upper right corner, select "Export" -> "CSV"
7. Save the CSV file in the appropriate place
8. Open the file and verify that it contains the appropriate structure (see above)
