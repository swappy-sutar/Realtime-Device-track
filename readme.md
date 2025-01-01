# Real-Time Location Tracking App

A real-time location tracking application built using Node.js, Express, Socket.IO, and Leaflet.js. The app allows users to share their live location and displays markers with their names on a map.

## Features

- **Real-Time Location Sharing**: Tracks users' locations in real-time using geolocation and WebSocket.
- **User Identification**: Prompts users for their names, which are displayed above their markers on the map.
- **Interactive Map**: Displays live location updates on an OpenStreetMap interface powered by Leaflet.js.
- **Dynamic Updates**: Adds, updates, and removes user markers as they connect, move, or disconnect.

## Technologies Used

- **Backend**:
  - [Node.js](https://nodejs.org/) for server-side scripting.
  - [Express](https://expressjs.com/) as a web framework.
  - [Socket.IO](https://socket.io/) for real-time communication.

- **Frontend**:
  - [Leaflet.js](https://leafletjs.com/) for interactive maps.
  - [HTML, CSS, and JavaScript](https://developer.mozilla.org/en-US/docs/Web).

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (v14+)
- npm (v6+)

### Steps

1. Clone the repository:
```bash
   git clone https://github.com/your-username/real-time-tracking-app.git
   cd real-time-tracking-app
```

2. Install dependencies:

```bash
    npm install
```

3. Setup environment variables: Create a .env file in the root directory and add the following:
```bash
   PORT=800
```

4. Start the application:
```bash
    npm start
```


   