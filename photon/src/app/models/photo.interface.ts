export interface Photo {
  description: string;
  location: string;
  coordinates: {
    latitude: Number;
    longitude: Number;
  };
  url: string;
}
