import { TimeSlotInterface } from 'interfaces/time-slot';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface BikeRepairStationInterface {
  id?: string;
  name: string;
  location: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  time_slot?: TimeSlotInterface[];
  organization?: OrganizationInterface;
  _count?: {
    time_slot?: number;
  };
}

export interface BikeRepairStationGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  location?: string;
  organization_id?: string;
}
