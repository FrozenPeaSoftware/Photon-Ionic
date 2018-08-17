export interface Photo {
  description: string;
  locationDescription: string;
  coordinates: {
    latitude: Number;
    longitude: Number;
  };
  timestamp: any,
  url: string;
}
