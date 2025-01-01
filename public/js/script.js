const socket = io();

// Ask for user's name when they first open the app
let userName = prompt("Please enter your name:");

while (!userName) {
  // If no name is entered, repeatedly ask the user
  userName = prompt("Name is required. Please enter your name:");
}

document.getElementById("loading").style.display = "block"; // Show loading message while waiting for geolocation

// Check if geolocation is available
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      // Emit the current location and name to the server
      socket.emit("send-location", { latitude, longitude, name: userName });
      document.getElementById("loading").style.display = "none"; // Hide loading message
    },
    (error) => {
      console.error("Error retrieving location:", error.message);
      alert("Unable to retrieve your location. Please enable location services.");
      document.getElementById("loading").style.display = "none"; // Hide loading message
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
} else {
  alert("Geolocation is not supported by your browser.");
  document.getElementById("loading").style.display = "none"; // Hide loading message
}

// Initialize the map
const map = L.map("map").setView([0, 0], 18);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© ByErSwappy❤️😉",
}).addTo(map);

const markers = {};

// Listen for location updates from the server
socket.on("receive-location", (data) => {
  const { id, latitude, longitude, name } = data;

  // Update map view to the current user's location
  if (id === socket.id) {
    map.setView([latitude, longitude], 18);
  }

  // Update or add a marker for the user
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
    markers[id].setPopupContent(`User: ${name}`);
  } else {
    markers[id] = L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(`User: ${name}`)
      .openPopup();
  }
});

// Remove the marker of disconnected users
socket.on("user-disconnect", (id) => {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
});
