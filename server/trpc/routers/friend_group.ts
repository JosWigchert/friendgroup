import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { publicProcedure, router } from '../trpc'

const prisma = new PrismaClient()

export const friendgroupRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Name is required'),
        description: z.string().optional(),
        image: z.string().optional(),
        userId: z.string().min(1, 'User ID is required')
      })
    )
    .mutation(async ({ input }) => {
      const { name, description, image, userId } = input

      const newGroup = await prisma.friendGroup.create({
        data: {
          name,
          description: description ?? '',
          image: image ?? '',
          members: {
            create: {
              userId,
              role: 'FOUNDER'
            }
          }
        }
      })

      return newGroup
    }),

  acceptInvitation: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
        userId: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { groupId, userId } = input

      const invitation = await prisma.friendGroupMember.findFirst({
        where: { friendGroupId: groupId, userId, role: 'USER' }
      })

      if (!invitation) {
        throw new Error('Invitation not found or already accepted')
      }

      return prisma.friendGroupMember.update({
        where: { id: invitation.id },
        data: { role: 'USER' }
      })
    }),

  exitGroup: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
        userId: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { groupId, userId } = input

      return prisma.friendGroupMember.deleteMany({
        where: { friendGroupId: groupId, userId }
      })
    }),

  removeMember: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
        memberId: z.string() // ID of the member to be removed
      })
    )
    .mutation(async ({ input }) => {
      const { groupId, memberId } = input

      return prisma.friendGroupMember.deleteMany({
        where: { friendGroupId: groupId, userId: memberId }
      })
    })
})
