import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { timeSlotValidationSchema } from 'validationSchema/time-slots';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.time_slot
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTimeSlotById();
    case 'PUT':
      return updateTimeSlotById();
    case 'DELETE':
      return deleteTimeSlotById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTimeSlotById() {
    const data = await prisma.time_slot.findFirst(convertQueryToPrismaUtil(req.query, 'time_slot'));
    return res.status(200).json(data);
  }

  async function updateTimeSlotById() {
    await timeSlotValidationSchema.validate(req.body);
    const data = await prisma.time_slot.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTimeSlotById() {
    const data = await prisma.time_slot.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
