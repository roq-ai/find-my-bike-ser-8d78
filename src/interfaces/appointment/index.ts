import { UserInterface } from 'interfaces/user';
import { TimeSlotInterface } from 'interfaces/time-slot';
import { GetQueryInterface } from 'interfaces';

export interface AppointmentInterface {
  id?: string;
  bike_owner_id?: string;
  time_slot_id?: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  time_slot?: TimeSlotInterface;
  _count?: {};
}

export interface AppointmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  bike_owner_id?: string;
  time_slot_id?: string;
  status?: string;
}
