import api from "./api";

interface CarFormData {
  make: string;
  model: string;
  year: string;
  price: string;
  color: string;
  mileage: string;
  description: string;
  images: string[];
  transmission: string;
  bodyType: string;
  fuelType: string;
  location: string;
  coverImage: string;
  source: string;
}

export default async function saveOnlineListing(listing: CarFormData) {
  const response = (await api.post("/onlinelisting", listing));
  return response.data;
}
