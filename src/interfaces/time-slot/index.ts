import { AppointmentInterface } from 'interfaces/appointment';
import { BikeRepairStationInterface } from 'interfaces/bike-repair-station';
import { GetQueryInterface } from 'interfaces';

export interface TimeSlotInterface {
  id?: string;
  start_time: any;
  end_time: any;
  bike_repair_station_id?: string;
  created_at?: any;
  updated_at?: any;
  appointment?: AppointmentInterface[];
  bike_repair_station?: BikeRepairStationInterface;
  _count?: {
    appointment?: number;
  };
}

export interface TimeSlotGetQueryInterface extends GetQueryInterface {
  id?: string;
  bike_repair_station_id?: string;
}
