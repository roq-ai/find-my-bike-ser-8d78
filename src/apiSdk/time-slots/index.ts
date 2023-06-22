import axios from 'axios';
import queryString from 'query-string';
import { TimeSlotInterface, TimeSlotGetQueryInterface } from 'interfaces/time-slot';
import { GetQueryInterface } from '../../interfaces';

export const getTimeSlots = async (query?: TimeSlotGetQueryInterface) => {
  const response = await axios.get(`/api/time-slots${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTimeSlot = async (timeSlot: TimeSlotInterface) => {
  const response = await axios.post('/api/time-slots', timeSlot);
  return response.data;
};

export const updateTimeSlotById = async (id: string, timeSlot: TimeSlotInterface) => {
  const response = await axios.put(`/api/time-slots/${id}`, timeSlot);
  return response.data;
};

export const getTimeSlotById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/time-slots/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTimeSlotById = async (id: string) => {
  const response = await axios.delete(`/api/time-slots/${id}`);
  return response.data;
};
