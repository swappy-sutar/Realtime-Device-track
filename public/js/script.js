const socket = io();

// Check if geolocation is available
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      // Emit the current location to the server
      socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
      console.error("Error retrieving location:", error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
} else {
  alert("Geolocation is not supported by your browser.");
}

// Initialize the map
const map = L.map("map").setView([0, 0], 18);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© ByErSwappy❤️😉",
}).addTo(map);

const markers = {};

// Listen for location updates from the server
socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;

  // Update map view to the current user's location
  if (id === socket.id) {
    map.setView([latitude, longitude], 18);
  }

  // Update or add a marker for the user
  console.log("markers[id]", markers[id]);
  
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude]).addTo(map).bindPopup(`User: ${id}`).openPopup();
  }
});

// Remove the marker of disconnected users
socket.on("user-disconnect", (id) => {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
});
