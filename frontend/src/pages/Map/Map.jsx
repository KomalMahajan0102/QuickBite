import React from 'react'
import "./Map.css";
import { io } from "socket.io-client";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

import { useEffect } from 'react';
const socket = io("http://localhost:4000");
function Map() {
    useEffect(() => {
 const map = L.map("map").setView([18.4574, 73.8522], 16);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // CSK restaurant marker
        const cskCoords = [18.457441542558715, 73.85220782204955];
        L.marker(cskCoords).addTo(map).bindPopup("CSK Restaurant").openPopup();

        // Create custom red icon for user
        const redIcon = new L.Icon({
            iconUrl: "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000",
            iconSize: [21, 34],
            iconAnchor: [10, 34],
            popupAnchor: [0, -34],
        });

        let userMarker = null;
        let routeControl = null;

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Sending location:", latitude, longitude);
                    socket.emit("send-location", { latitude, longitude });

                    const userLatLng = [latitude, longitude];

                    if (userMarker) {
                        userMarker.setLatLng(userLatLng);
                    } else {
                        userMarker = L.marker(userLatLng, )
                            .addTo(map)
                            .bindPopup("You are here")
                            .openPopup();
                    }

                    map.setView(userLatLng, 16);

                    // Draw shortest path
                    if (routeControl) {
                        map.removeControl(routeControl);
                    }

                    routeControl = L.Routing.control({
                        waypoints: [
                            L.latLng(latitude, longitude),
                            L.latLng(...cskCoords)
                        ],
                        lineOptions: {
                            styles: [{ color: "blue", weight: 4 }]
                        },
                        routeWhileDragging: false,
                        draggableWaypoints: false,
                        addWaypoints: false,
                        createMarker: () => null
                    }).addTo(map);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            console.error("Geolocation not supported.");
        }

        return () => {
            socket.disconnect();
            map.remove(); // Clean up the map instance
        };
        
        // const map = L.map("map").setView([18.4574, 73.8522], 16);

        // // Add OpenStreetMap tiles
        // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        //     attribution: '&copy; OpenStreetMap contributors'
        // }).addTo(map);

        // // 🔵 Add CSK restaurant marker (fixed)
        // const cskCoords = [18.457441542558715, 73.85220782204955];
        // L.marker(cskCoords).addTo(map).bindPopup("CSK Restaurant").openPopup();

        // // 🔴 User marker
        // let userMarker = null;

        // // Watch user location
        // if (navigator.geolocation) {
        //     navigator.geolocation.watchPosition(
        //         (position) => {
        //             const { latitude, longitude } = position.coords;
        //             console.log("Sending location:", latitude, longitude);
        //             socket.emit("send-location", { latitude, longitude });

        //             // Update user marker
        //             if (userMarker) {
        //                 userMarker.setLatLng([latitude, longitude]);
        //             } else {
        //                 userMarker = L.marker([latitude, longitude]).addTo(map).bindPopup("You are here").openPopup();
        //             }

        //             // Center map on user
        //             map.setView([latitude, longitude], 16);
        //         },
        //         (error) => {
        //             console.error("Geolocation error:", error);
        //         },
        //         {
        //             enableHighAccuracy: true,
        //             timeout: 5000,
        //             maximumAge: 0,
        //         }
        //     );
        // } else {
        //     console.error("Geolocation not supported.");
        // }

        // return () => {
        //     socket.disconnect();
        // };


        
    }, []);

    return (
        <div>
            <h2>Real-Time Tracking</h2>
            <div id="map" style={{ height: "650px", width: "100%" }}></div>
        </div>
    )
}

export default Map
