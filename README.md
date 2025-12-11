# Mission 5 Phase 2 – Fuel Price Comparison App

A team-developed fuel price comparison application built in Mission 5 Phase 2. This application allows users to compare fuel prices across stations, view station services, and see distances from their location. The project demonstrates a complete full-stack implementation with multiple screens, frontend and backend integration, and MongoDB database.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Team Workflow](#team-workflow)
- [License](#license)

## About

This project is **Version 1** of a fuel price comparison application created based on UX prototype designs. Each developer on the team worked on at least one complete screen with both frontend and backend features. The application uses MongoDB for data persistence and follows best practices for team collaboration via GitHub.

## Features

### Home Page

- Hero section with application introduction
- Quick access to key features

### Fuel Price Comparison Page

- Compare fuel prices across multiple stations
- Filter fuel types using interactive dropdowns
- Real-time price comparison grid display
- View detailed station information
- Accessible dropdown selection UI

### Locations Page

- Interactive map with station location pins
- Browse all fuel stations in the area
- Click on map pins to view station details
- Calculate distance from user location
- Station services and amenities display

### Core Functionality

- MongoDB backend for persistent data storage
- RESTful API endpoints for all operations
- Geolocation support to calculate distances
- Error handling and validation
- Responsive UI with CSS Modules
- ARIA labels and accessibility enhancements

## Tech Stack

- **Frontend:** React, Vite, CSS Modules, ESLint
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Version Control:** Git & GitHub


## Getting Started

### Prerequisites

- Node.js installed
- MongoDB running locally or remote connection string
- Git for version control

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Arjan269/Mission-5-P2.git
   cd Mission-5-P2
   ```

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:

   ```bash
   cd ../client/z-energy
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `server` directory
   - Add your MongoDB connection string: `MONGODB_URI=your_connection_string`
   - Configure any other necessary environment variables

### Running the Application

**Terminal 1 - Start the backend server:**

```bash
cd server
npm run server
```

**Terminal 2 - Start the frontend development server:**

```bash
cd client/z-energy
npm run dev
```

The application will be available at `http://localhost:5173`

### Database Seeding (Optional)

To populate the database with sample station data:

```bash
cd cli-tool
npm install
node index.js seed
```

To clear the database:

```bash
node index.js unseed
```

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

## Team Workflow

This project follows a collaborative team-based approach:

- **Each developer** owns at least one complete screen with both frontend and backend components
- **GitHub** is used for version control and collaboration
- **Pull requests** should be made to the `main` branch for code review
- **Common components** are shared across screens (located in `/components` and `/common`)

### Development Best Practices

- Use descriptive commit messages
- Keep commits focused and atomic
- Test features locally before pushing
- Communicate with team members about component usage
- Follow the existing code style and structure

## Accessibility

- Interactive elements include appropriate ARIA labels and roles
- Screen reader support for navigation and content
- Semantic HTML structure throughout
- Accessible form controls and dropdowns

## License

This project is for **educational purposes** as part of the Mission 5 course at Mission Ready HQ.
