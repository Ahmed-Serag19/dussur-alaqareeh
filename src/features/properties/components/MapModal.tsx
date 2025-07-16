"use client";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, X, Locate, Loader2, AlertCircle } from "lucide-react";
import { useIpLocationQuery } from "@/features/properties/hooks/useIpLocationQuery";
import useLanguage from "@/hooks/useLanguage";

// Leaflet fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (loc: { lat: number; lng: number }) => void;
  selectedLocation: { lat: number; lng: number } | null;
  cityName?: string;
}

const LocationSelector = ({
  onSelect,
}: {
  onSelect: (loc: { lat: number; lng: number }) => void;
}) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
};

const MapController = ({
  center,
  shouldFlyTo,
}: {
  center: { lat: number; lng: number };
  shouldFlyTo: boolean;
}) => {
  const map = useMap();
  useEffect(() => {
    if (shouldFlyTo) {
      map.flyTo([center.lat, center.lng], 15);
    }
  }, [center, shouldFlyTo]);
  return null;
};

export default function MapModal({
  isOpen,
  onClose,
  onLocationSelect,
  selectedLocation,
  cityName,
}: MapModalProps) {
  const { isRTL, t } = useLanguage();
  const defaultCenter = { lat: 20, lng: 0 };
  const [mapCenter, setMapCenter] = useState(selectedLocation || defaultCenter);
  const [tempLocation, setTempLocation] = useState(selectedLocation);
  const [gettingGps, setGettingGps] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldFly, setShouldFly] = useState(false);

  const { data: ipLocation } = useIpLocationQuery();

  const tryGps = () => {
    setGettingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setMapCenter(coords);
        setTempLocation(coords);
        setShouldFly(true);
        setError(null);
        setGettingGps(false);
      },
      () => {
        if (ipLocation) {
          const coords = { lat: ipLocation.lat, lng: ipLocation.lng };
          setMapCenter(coords);
          setTempLocation(coords);
          setShouldFly(true);
          setError(t("properties.mapModal.usingIpLocation"));
        } else {
          setError(t("properties.mapModal.couldNotGetLocation"));
        }
        setGettingGps(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    if (selectedLocation) {
      setMapCenter(selectedLocation);
    }
  }, [isOpen, selectedLocation]);

  const confirm = () => {
    if (tempLocation) onLocationSelect(tempLocation);
    onClose();
  };
  const cancel = () => {
    setTempLocation(selectedLocation);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={cancel}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>
              <MapPin className="mr-2" />
              {t("properties.mapModal.selectLocation")}
              {cityName && ` — ${cityName}`}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={cancel}>
              <X />
            </Button>
          </div>
        </DialogHeader>
        <DialogDescription className="sr-only">
          {t("properties.mapModal.mapInterface")}
        </DialogDescription>

        <div className="space-y-4">
          <div
            className={`flex items-center gap-3 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={tryGps}
              disabled={gettingGps}
            >
              {gettingGps ? <Loader2 className="animate-spin" /> : <Locate />}
              {gettingGps
                ? t("properties.mapModal.locating")
                : t("properties.mapModal.useMyLocation")}
            </Button>
            {error && (
              <div className="flex items-center gap-2 p-2 bg-amber-50 border rounded">
                <AlertCircle className="text-amber-600" />
                <span className="text-amber-800">{error}</span>
              </div>
            )}
          </div>

          {/* Hide lat/lng display */}

          <div className="w-full h-96 border rounded overflow-hidden">
            <MapContainer
              center={mapCenter}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
              className={isRTL ? "leaflet-rtl" : ""}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
              {tempLocation && (
                <Marker position={[tempLocation.lat, tempLocation.lng]} />
              )}
              <LocationSelector onSelect={setTempLocation} />
              <MapController center={mapCenter} shouldFlyTo={shouldFly} />
            </MapContainer>
          </div>

          <div className="flex justify-end gap-2 border-t pt-4 pb-4">
            <Button variant="outline" onClick={cancel}>
              {t("common.cancel")}
            </Button>
            <Button onClick={confirm} disabled={!tempLocation}>
              {t("common.confirm")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
