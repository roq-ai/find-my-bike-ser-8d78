import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { bikeRepairStationValidationSchema } from 'validationSchema/bike-repair-stations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.bike_repair_station
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBikeRepairStationById();
    case 'PUT':
      return updateBikeRepairStationById();
    case 'DELETE':
      return deleteBikeRepairStationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBikeRepairStationById() {
    const data = await prisma.bike_repair_station.findFirst(convertQueryToPrismaUtil(req.query, 'bike_repair_station'));
    return res.status(200).json(data);
  }

  async function updateBikeRepairStationById() {
    await bikeRepairStationValidationSchema.validate(req.body);
    const data = await prisma.bike_repair_station.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteBikeRepairStationById() {
    const data = await prisma.bike_repair_station.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
