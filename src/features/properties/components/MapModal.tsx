import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Locate, X } from "lucide-react";
import useLanguage from "@/hooks/useLanguage";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  selectedLocation: { lat: number; lng: number } | null;
  cityName?: string;
}

const MapModal = ({
  isOpen,
  onClose,
  onLocationSelect,
  selectedLocation,
  cityName,
}: MapModalProps) => {
  const { t } = useLanguage();
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [tempLocation, setTempLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(selectedLocation);

  useEffect(() => {
    if (isOpen && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
          // If no location is selected, start from current location
          if (!selectedLocation && !tempLocation) {
            setTempLocation(location);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to Riyadh if geolocation fails
          const defaultLocation = { lat: 24.7136, lng: 46.6753 };
          setCurrentLocation(defaultLocation);
          if (!selectedLocation && !tempLocation) {
            setTempLocation(defaultLocation);
          }
        }
      );
    }
  }, [isOpen, selectedLocation, tempLocation]);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Convert click position to coordinates (simplified)
    const centerLat = currentLocation?.lat || 24.7136;
    const centerLng = currentLocation?.lng || 46.6753;

    const lat = centerLat + (y - rect.height / 2) * 0.0001;
    const lng = centerLng + (x - rect.width / 2) * 0.0001;

    setTempLocation({ lat, lng });
  };

  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      setTempLocation(currentLocation);
    }
  };

  const handleConfirm = () => {
    if (tempLocation) {
      onLocationSelect(tempLocation);
    }
    onClose();
  };

  const handleCancel = () => {
    setTempLocation(selectedLocation);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {t("properties.selectLocation")}
              {cityName && (
                <span className="text-sm text-gray-500">- {cityName}</span>
              )}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUseCurrentLocation}
              disabled={!currentLocation}
              className="flex items-center gap-2"
            >
              <Locate className="h-4 w-4" />
              Use Current Location
            </Button>
          </div>

          {/* Simple Map Container */}
          <div
            className="relative w-full h-80 bg-gray-50 rounded-lg border border-gray-300 cursor-crosshair overflow-hidden"
            onClick={handleMapClick}
          >
            {/* Simple grid background to simulate map */}
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 opacity-30"></div>
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              ></div>
            </div>

            {/* Current Location Marker (Blue) */}
            {currentLocation && (
              <div
                className="absolute w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                title="Your current location"
              >
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              </div>
            )}

            {/* Selected Location Marker (Red) */}
            {tempLocation && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-full z-20"
                style={{
                  left: `${
                    50 +
                    (tempLocation.lng - (currentLocation?.lng || 46.6753)) *
                      10000
                  }%`,
                  top: `${
                    50 -
                    (tempLocation.lat - (currentLocation?.lat || 24.7136)) *
                      10000
                  }%`,
                }}
              >
                <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" />
              </div>
            )}

            {/* Instructions */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
              <p className="text-sm font-medium text-gray-700">
                Click anywhere to select location
              </p>
              {tempLocation && (
                <p className="text-xs text-gray-500 mt-1">
                  Lat: {tempLocation.lat.toFixed(6)}
                  <br />
                  Lng: {tempLocation.lng.toFixed(6)}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={!tempLocation}>
              Confirm Location
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;
