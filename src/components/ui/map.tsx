// ;

// import { useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix for default markers in Leaflet
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// interface MapProps {
//   center: [number, number];
//   zoom?: number;
//   onLocationSelect?: (lat: number, lng: number) => void;
//   selectedLocation?: { lat: number; lng: number } | null;
//   className?: string;
// }

// export const Map = ({
//   center,
//   zoom = 13,
//   onLocationSelect,
//   selectedLocation,
//   className = "",
// }: MapProps) => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const mapInstanceRef = useRef<L.Map | null>(null);
//   const markerRef = useRef<L.Marker | null>(null);

//   useEffect(() => {
//     if (!mapRef.current) return;

//     // Initialize map
//     const map = L.map(mapRef.current).setView(center, zoom);
//     mapInstanceRef.current = map;

//     // Add tile layer (OpenStreetMap)
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     // Handle map clicks
//     if (onLocationSelect) {
//       map.on("click", (e) => {
//         const { lat, lng } = e.latlng;
//         onLocationSelect(lat, lng);
//       });
//     }

//     // Cleanup function
//     return () => {
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current.remove();
//         mapInstanceRef.current = null;
//       }
//     };
//   }, [center, zoom, onLocationSelect]);

//   // Update marker when selectedLocation changes
//   useEffect(() => {
//     if (!mapInstanceRef.current) return;

//     // Remove existing marker
//     if (markerRef.current) {
//       mapInstanceRef.current.removeLayer(markerRef.current);
//       markerRef.current = null;
//     }

//     // Add new marker if location is selected
//     if (selectedLocation) {
//       const marker = L.marker([selectedLocation.lat, selectedLocation.lng])
//         .addTo(mapInstanceRef.current)
//         .bindPopup(
//           `Selected Location<br>Lat: ${selectedLocation.lat.toFixed(
//             6
//           )}<br>Lng: ${selectedLocation.lng.toFixed(6)}`
//         );

//       markerRef.current = marker;

//       // Center map on selected location
//       mapInstanceRef.current.setView(
//         [selectedLocation.lat, selectedLocation.lng],
//         zoom
//       );
//     }
//   }, [selectedLocation, zoom]);

//   return <div ref={mapRef} className={`w-full h-full ${className}`} />;
// };
