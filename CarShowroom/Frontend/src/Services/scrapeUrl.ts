import api from "./api";

export default async function scrapeUrl(url: string, provider: string) {
  const params = new URLSearchParams({
    target: url,
    provider: provider,
  });
  const response = await api.get(`/onlinelisting?${params.toString()}`);
  return response;
}
