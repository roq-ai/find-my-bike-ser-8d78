import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { bikeRepairStationValidationSchema } from 'validationSchema/bike-repair-stations';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getBikeRepairStations();
    case 'POST':
      return createBikeRepairStation();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBikeRepairStations() {
    const data = await prisma.bike_repair_station
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'bike_repair_station'));
    return res.status(200).json(data);
  }

  async function createBikeRepairStation() {
    await bikeRepairStationValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.time_slot?.length > 0) {
      const create_time_slot = body.time_slot;
      body.time_slot = {
        create: create_time_slot,
      };
    } else {
      delete body.time_slot;
    }
    const data = await prisma.bike_repair_station.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
