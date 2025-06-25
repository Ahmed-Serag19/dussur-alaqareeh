// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { MapPin, Navigation, Search, ExternalLink } from "lucide-react";
// import useLanguage from "@/hooks/useLanguage";

// interface SimpleMapProps {
//   onLocationSelect: (location: { lat: number; lng: number }) => void;
//   selectedLocation: { lat: number; lng: number } | null;
//   cityName?: string;
// }

// export const SimpleMap = ({
//   onLocationSelect,
//   selectedLocation,
//   cityName,
// }: SimpleMapProps) => {
//   const { t, isRTL } = useLanguage();
//   const [manualLat, setManualLat] = useState("");
//   const [manualLng, setManualLng] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isGettingLocation, setIsGettingLocation] = useState(false);

//   // Update manual inputs when selectedLocation changes
//   useEffect(() => {
//     if (selectedLocation) {
//       setManualLat(selectedLocation.lat.toString());
//       setManualLng(selectedLocation.lng.toString());
//     }
//   }, [selectedLocation]);

//   const handleManualLocationSubmit = () => {
//     const lat = Number.parseFloat(manualLat);
//     const lng = Number.parseFloat(manualLng);

//     if (!isNaN(lat) && !isNaN(lng)) {
//       if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
//         onLocationSelect({ lat, lng });
//       } else {
//         alert(
//           "Please enter valid coordinates (Latitude: -90 to 90, Longitude: -180 to 180)"
//         );
//       }
//     } else {
//       alert("Please enter valid numbers for coordinates");
//     }
//   };

//   const handleGetCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by this browser.");
//       return;
//     }

//     setIsGettingLocation(true);
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const location = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
//         onLocationSelect(location);
//         setIsGettingLocation(false);
//       },
//       (error) => {
//         console.error("Geolocation error:", error);
//         let errorMessage = "Unable to get your current location. ";

//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage +=
//               "Location access was denied. Please enable location permissions in your browser settings and try again.";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage +=
//               "Location information is unavailable. Please check your internet connection or enter coordinates manually.";
//             break;
//           case error.TIMEOUT:
//             errorMessage +=
//               "Location request timed out. Please try again or enter coordinates manually.";
//             break;
//           default:
//             errorMessage +=
//               "An unknown error occurred. Please enter coordinates manually.";
//             break;
//         }

//         alert(errorMessage);
//         setIsGettingLocation(false);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 60000,
//       }
//     );
//   };

//   const handleSearchLocation = () => {
//     if (!searchQuery.trim()) {
//       alert("Please enter a location to search");
//       return;
//     }

//     // Open Google Maps in a new tab for the user to find coordinates
//     const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(
//       searchQuery + (cityName ? ` ${cityName}` : " Saudi Arabia")
//     )}`;
//     window.open(searchUrl, "_blank");
//     alert(
//       "Google Maps opened in a new tab. Find your location, right-click on it, select the coordinates, and copy them to paste below."
//     );
//   };

//   const commonLocations = [
//     { name: "الرياض - وسط المدينة", lat: 24.7136, lng: 46.6753 },
//     { name: "جدة - وسط المدينة", lat: 21.4858, lng: 39.1925 },
//     { name: "الدمام - وسط المدينة", lat: 26.4207, lng: 50.0888 },
//     { name: "مكة المكرمة", lat: 21.3891, lng: 39.8579 },
//     { name: "المدينة المنورة", lat: 24.5247, lng: 39.5692 },
//   ];

//   return (
//     <div className="space-y-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
//       <div className="text-center">
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">
//           تحديد موقع العقار
//         </h3>
//         <p className="text-sm text-gray-600">
//           اختر إحدى الطرق التالية لتحديد موقع العقار
//         </p>
//       </div>

//       {/* Interactive Map Preview */}
//       {selectedLocation && (
//         <div className="space-y-3">
//           <Label
//             className={`block text-sm font-medium ${
//               isRTL ? "text-right" : "text-left"
//             }`}
//           >
//             معاينة الموقع المحدد
//           </Label>
//           <div className="relative w-full h-64 bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
//             <iframe
//               width="100%"
//               height="100%"
//               frameBorder="0"
//               style={{ border: 0 }}
//               src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWTgHz-TK7VCM&center=${selectedLocation.lat},${selectedLocation.lng}&zoom=15`}
//               allowFullScreen
//               title="Property Location"
//             />
//             <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs">
//               <div className="flex items-center gap-1 text-green-600">
//                 <MapPin className="h-3 w-3" />
//                 <span>موقع محدد</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Current Location Button */}
//       <div className="space-y-2">
//         <Button
//           type="button"
//           onClick={handleGetCurrentLocation}
//           disabled={isGettingLocation}
//           className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
//         >
//           {isGettingLocation ? (
//             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//           ) : (
//             <Navigation className="h-4 w-4" />
//           )}
//           {isGettingLocation ? "جاري تحديد الموقع..." : "استخدام الموقع الحالي"}
//         </Button>
//       </div>

//       {/* Search Location */}
//       <div className="space-y-2">
//         <Label
//           className={`block text-sm font-medium ${
//             isRTL ? "text-right" : "text-left"
//           }`}
//         >
//           البحث عن موقع
//         </Label>
//         <div className="flex gap-2">
//           <Input
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="ادخل اسم المكان أو العنوان"
//             className={isRTL ? "text-right" : "text-left"}
//           />
//           <Button
//             type="button"
//             onClick={handleSearchLocation}
//             variant="outline"
//           >
//             <Search className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       {/* Common Locations */}
//       <div className="space-y-2">
//         <Label
//           className={`block text-sm font-medium ${
//             isRTL ? "text-right" : "text-left"
//           }`}
//         >
//           مواقع شائعة
//         </Label>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//           {commonLocations.map((location, index) => (
//             <Button
//               key={index}
//               type="button"
//               variant="outline"
//               size="sm"
//               onClick={() =>
//                 onLocationSelect({ lat: location.lat, lng: location.lng })
//               }
//               className="text-xs"
//             >
//               {location.name}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Manual Coordinates Input */}
//       <div className="space-y-3">
//         <Label
//           className={`block text-sm font-medium ${
//             isRTL ? "text-right" : "text-left"
//           }`}
//         >
//           إدخال الإحداثيات يدوياً
//         </Label>
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <Label htmlFor="lat" className="text-xs text-gray-600">
//               خط العرض (Latitude)
//             </Label>
//             <Input
//               id="lat"
//               type="number"
//               step="any"
//               value={manualLat}
//               onChange={(e) => setManualLat(e.target.value)}
//               placeholder="24.7136"
//               className="text-sm"
//             />
//           </div>
//           <div>
//             <Label htmlFor="lng" className="text-xs text-gray-600">
//               خط الطول (Longitude)
//             </Label>
//             <Input
//               id="lng"
//               type="number"
//               step="any"
//               value={manualLng}
//               onChange={(e) => setManualLng(e.target.value)}
//               placeholder="46.6753"
//               className="text-sm"
//             />
//           </div>
//         </div>
//         <Button
//           type="button"
//           onClick={handleManualLocationSubmit}
//           variant="outline"
//           className="w-full"
//           disabled={!manualLat || !manualLng}
//         >
//           تأكيد الإحداثيات
//         </Button>
//       </div>

//       {/* Selected Location Display */}
//       {selectedLocation && (
//         <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//           <div className="flex items-center gap-2 text-green-800">
//             <MapPin className="h-4 w-4" />
//             <span className="font-medium">تم تحديد الموقع</span>
//           </div>
//           <p className="text-sm text-green-600 mt-1">
//             خط العرض: {selectedLocation.lat.toFixed(6)} | خط الطول:{" "}
//             {selectedLocation.lng.toFixed(6)}
//           </p>

//           {/* Google Maps Preview Link */}
//           <Button
//             type="button"
//             variant="link"
//             size="sm"
//             onClick={() => {
//               const mapsUrl = `https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}`;
//               window.open(mapsUrl, "_blank");
//             }}
//             className="text-green-600 hover:text-green-700 p-0 h-auto mt-2 flex items-center gap-1"
//           >
//             عرض في خرائط جوجل
//             <ExternalLink className="h-3 w-3" />
//           </Button>
//         </div>
//       )}

//       {/* Instructions */}
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//         <p className="text-xs text-blue-800">
//           <strong>نصائح:</strong> يمكنك البحث عن الموقع في خرائط جوجل، ثم النقر
//           بالزر الأيمن على الموقع المطلوب ونسخ الإحداثيات، أو استخدام الموقع
//           الحالي إذا كنت في نفس المكان.
//         </p>
//       </div>
//     </div>
//   );
// };
