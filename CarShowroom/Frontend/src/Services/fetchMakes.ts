import api from "./api";

export default async function getMakes()
{
    const response = await api.get('/makes')
    return response.data // the json itself
}