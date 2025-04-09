# Lystio Property Search Interface

A Next.js application showcasing an interactive property search interface with Mapbox integration.

## Project Overview

This project implements a full-featured property search interface based on the Lystio design, featuring:

- Responsive list/grid view for property listings
- Interactive Mapbox map with property markers and information popups
- Synchronized filtering between map and listing panel
- Dynamic property cards with image carousels and detailed information

## Features

### List View
- Display properties with information from the `/tenement/search` API endpoint
- Multiple view options (grid, list, compact)
- Sorting functionality
- Loading states handling

### Mapbox Integration
- Interactive map with property markers
- Custom popups showing property details
- Synchronization between map and listing panel
- Auto-zoom functionality to fit all visible markers
- Navigation controls and UI elements from the Lystio design

### Filtering
- Price range filtering
- Filter synchronization between map and list views
- API integration with the `/tenement/search` and `/tenement/search/map` endpoints

## Technical Implementation

### Tech Stack
- Next.js/React
- TypeScript
- Mapbox GL
- Tailwind CSS for styling
- React Query for data fetching

### Key Components
- `Listings.tsx`: Main container component for the search interface
- `MapboxListing.tsx`: Mapbox map integration with markers and popups
- `ListingCard.tsx`: Property card component with image carousel
- `ListingHeader.tsx`: Header with view options and sorting

### API Integration
The application interfaces with:
- `/tenement/search` for listing data
- `/tenement/search/map` for map-specific data

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file with your Mapbox token:
   ```
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
   ```
   NEXT_PUBLIC_API_BASE_URL=https://api.lystio.co
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### Mapbox
The application requires a valid Mapbox access token. The token is configured to work with:
- http://localhost
- http://localhost:3000
- https://lystio.local
- https://lystio.dev