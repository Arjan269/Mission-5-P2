# Mission 5 Phase 2 – Fuel Price Comparison App

This repository contains the Mission 5 Phase 2 project for **Mission 5**. The app allows users to compare fuel prices across stations, view station services, and see distances from their location. This version includes the first completed screen with frontend and backend features.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The goal of this project phase was to create **Version 1 of the designed application** based on the UX prototype. Each team member worked on at least one screen with both frontend and backend integration. The app uses a MongoDB backend to store station data and fuel prices.

## Features

### Home Page

- Hero section with app introduction
- Quick access to key features

### Fuel Price Comparison Page

- Compare fuel prices between multiple stations
- Filter by fuel type (Petrol, Diesel, etc.)
- Interactive dropdowns to select stations
- Real-time price comparison grid
- View all station details at a glance

### Locations Page

- Interactive map with station pins
- View all fuel stations in the area
- Click on pins to see station details
- Distance calculation from user location
- Station location information and services

### Map Integration

- Visual map display with marker pins
- Locate nearby fuel stations
- Interactive station cards on the map
- Responsive map layout

### Station Details

- Station name and location
- Available fuel types and prices
- Services offered (amenities)
- Distance from user location
- Contact and location information

### General Features

- Responsive UI with accessibility enhancements (ARIA labels)
- Navigation bar across all pages
- Error handling for API requests
- Geolocation support to calculate distances
- Clean, modern UI with CSS Modules

## Technologies

- **Frontend:** React, CSS Modules
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Version Control:** Git & GitHub

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Arjan269/Mission-5-P2.git
   ```
2. Navigate to the project folder and install dependencies:
   ```bash
   cd Mission-5-P2
   npm install
   ```
3. Start the backend server (example):
   ```bash
   cd .\server\
   npm run server
   ```
4. Start the React frontend:
   ```bash
   cd .\client\z-energy\
   npm start
   ```

> Ensure MongoDB is running locally or update the connection string in the backend `.env` file.

## Usage

- Open the app in a browser at `http://localhost:5173`.
- Use the **station dropdowns** to select stations for comparison.
- Filter fuel types using the buttons at the top of the comparison page.
- If location access is enabled, the app shows distances to stations.

## Folder Structure

```
Mission-5-P2/
├── README.md                          # Project documentation
├── cli-tool/                          # CLI utility for database seeding
│   ├── index.js                       # CLI entry point
│   ├── package.json                   # CLI dependencies
│   ├── commands/
│   │   ├── seed.js                    # Seed database command
│   │   └── unseed.js                  # Unseed database command
│   ├── data/
│   │   └── seedStationData.js         # Station data for seeding
│   └── models/
│       └── Station.js                 # Station model for CLI
│
├── client/                            # Frontend React application
│   └── z-energy/
│       ├── package.json               # Frontend dependencies
│       ├── vite.config.js             # Vite configuration
│       ├── eslint.config.js           # ESLint configuration
│       ├── index.html                 # HTML entry point
│       ├── public/                    # Static assets
│       └── src/
│           ├── main.jsx               # React entry point
│           ├── App.jsx                # Main app component
│           ├── App.module.css         # App styles
│           ├── index.css              # Global styles
│           ├── assets/                # Images and icons
│           ├── common/                # Shared components
│           │   ├── Navbar.jsx         # Navigation bar component
│           │   └── Navbar.module.css
│           ├── components/            # Reusable UI components
│           │   ├── CompareGrid/       # Price comparison grid
│           │   │   ├── CompareGrid.jsx
│           │   │   └── CompareGrid.module.css
│           │   ├── HeroSection/       # Hero banner
│           │   │   ├── HeroSection.jsx
│           │   │   └── HeroSection.module.css
│           │   ├── LocationFilterMenu/# Location filter dropdown
│           │   │   ├── LocationFilterMenu.jsx
│           │   │   └── LocationFilterMenu.module.css
│           │   ├── MapStationCard/    # Station card on map
│           │   │   ├── MapStationCard.jsx
│           │   │   └── MapStationCard.module.css
│           │   ├── MapWithPins/       # Interactive map
│           │   │   ├── MapWithPins.jsx
│           │   │   └── MapWithPins.module.css
│           │   ├── StationCard/       # Station info card
│           │   │   ├── StationCard.jsx
│           │   │   └── StationCard.module.css
│           │   └── StationDropdown/   # Station selection dropdown
│           │       ├── StationDropdown.jsx
│           │       └── StationDropdown.module.css
│           ├── pages/                 # Page components
│           │   ├── NotFound.jsx       # 404 page
│           │   ├── Home/              # Home page
│           │   │   ├── Home.jsx
│           │   │   └── Home.module.css
│           │   ├── FuelPriceComparePage/ # Price comparison page
│           │   │   ├── PriceComp.jsx
│           │   │   └── priceCompStyles.module.css
│           │   ├── Locations/         # Locations page with map
│           │   │   ├── locations.jsx
│           │   │   └── locations.module.css
│           │   └── TempStation/       # Temp station page
│           │       ├── tempStation.jsx
│           │       └── tempStation.jsx
│           └── data/
│               └── tempStationsData.js # Temporary test data
│
└── server/                            # Backend Node.js server
    ├── package.json                   # Server dependencies
    ├── server.js                      # Express server entry point
    ├── config/
    │   └── db.js                      # MongoDB database configuration
    ├── controllers/                   # Request handlers
    │   ├── mapController.js           # Map-related logic
    │   └── StationController.js       # Station CRUD operations
    ├── models/                        # Database models
    │   └── Station.js                 # Station schema
    ├── routes/                        # API route definitions
    │   ├── mapRoutes.js               # Map endpoints
    │   └── stationRoutes.js           # Station endpoints
    └── utils/
        ├── calculateDistance.js       # Distance calculation utility
        └── errorHandler.js            # Error handling middleware
```

## Accessibility

- All interactive elements have ARIA labels and roles.
- Lists are announced properly for screen readers.
- Hero banners and icons have descriptive alt text.

## Contributing

- Team members collaborate via GitHub.
- Pull requests should be made to the `main` branch.
- Each developer works on one screen frontend and backend.

## License

This project is for **educational purposes** as part of the Mission 5 course and does not have a formal license.
