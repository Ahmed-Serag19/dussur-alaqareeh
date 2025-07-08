import { useQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_IP_GEOLOCATION_IO_API_KEY;

export const useIpLocationQuery = () =>
  useQuery({
    queryKey: ["ip-location"],
    queryFn: async () => {
      const res = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`
      );
      if (!res.ok) throw new Error("IP geolocation failed");
      const data = await res.json();

      return {
        lat: parseFloat(data.latitude),
        lng: parseFloat(data.longitude),
        ip: data.ip,
      };
    },
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  });
