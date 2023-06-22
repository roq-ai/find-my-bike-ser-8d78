const mapping: Record<string, string> = {
  appointments: 'appointment',
  'bike-repair-stations': 'bike_repair_station',
  organizations: 'organization',
  'time-slots': 'time_slot',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
