import axios from 'axios';
import queryString from 'query-string';
import { BikeRepairStationInterface, BikeRepairStationGetQueryInterface } from 'interfaces/bike-repair-station';
import { GetQueryInterface } from '../../interfaces';

export const getBikeRepairStations = async (query?: BikeRepairStationGetQueryInterface) => {
  const response = await axios.get(`/api/bike-repair-stations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBikeRepairStation = async (bikeRepairStation: BikeRepairStationInterface) => {
  const response = await axios.post('/api/bike-repair-stations', bikeRepairStation);
  return response.data;
};

export const updateBikeRepairStationById = async (id: string, bikeRepairStation: BikeRepairStationInterface) => {
  const response = await axios.put(`/api/bike-repair-stations/${id}`, bikeRepairStation);
  return response.data;
};

export const getBikeRepairStationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/bike-repair-stations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBikeRepairStationById = async (id: string) => {
  const response = await axios.delete(`/api/bike-repair-stations/${id}`);
  return response.data;
};
