import api from "./api";
async function getAllCars()
{
    const response = await api.get('/cars');
    return response.data;
}

async function getUsedCars()
{

}

async function getNewCars()
{

}

export {getAllCars, getUsedCars, getNewCars};