import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { FriendGroup } from '@prisma/client'

export const friendgroupRouter = router({
    create: publicProcedure
        .input(
            z.object({
                name: z.string().min(1, 'Name is required').max(64, 'Name is too long'),
                description: z.string().max(512, 'Description is too long').optional().nullable().or(z.literal('')),
                image: z.string().url().optional().nullable().or(z.literal('')),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (!ctx.session?.user) {
                return { error: 'Not authenticated' }
            }

            const { name, description, image } = input
            const userId = (ctx.session.user as any).id as string

            const newGroup = await ctx.prisma.friendGroup.create({
                data: {
                    name,
                    description: description ?? '',
                    image: image ?? '',
                    members: {
                        create: {
                            userId,
                            role: 'FOUNDER', 
                        }
                    }
                }
            })

            return { data: newGroup }
        }),

    update: publicProcedure
        .input(
            z.object({
                group: z.object({
                    name: z.string().min(1, 'Name is required').max(64, 'Name is too long'),
                    description: z.string().max(512, 'Description is too long').optional(),
                    image: z.string().url().optional(),
                    id: z.string(),
                })
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (!ctx.session?.user) {
                return { error: 'Not authenticated' }
            }

            const { group } = input
            const userId = (ctx.session.user as any).id as string

            return { 
                data: await ctx.prisma.friendGroup.update({
                    where: { 
                        id: group.id,
                        members: { some: { userId, OR: [ { role: 'FOUNDER' }, { role: 'USER' } ] } }    
                    },
                    data: { 
                        name: group.name, 
                        description: group.description, 
                        image: group.image, 
                    } 
                })
            }
        }),

    acceptInvitation: publicProcedure
        .input(
            z.object({
                groupId: z.string(),
                userId: z.string()
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { groupId, userId } = input

            const invitation = await ctx.prisma.friendGroupMember.findFirst({
                where: { friendGroupId: groupId, userId, role: 'USER' }
            })

            if (!invitation) {
                throw new Error('Invitation not found or already accepted')
            }

            return ctx.prisma.friendGroupMember.update({
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
        .mutation(async ({ input, ctx }) => {
            const { groupId, userId } = input

            return ctx.prisma.friendGroupMember.deleteMany({
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
        .mutation(async ({ input, ctx }) => {
            const { groupId, memberId } = input

            return ctx.prisma.friendGroupMember.deleteMany({
                where: { friendGroupId: groupId, userId: memberId }
            })
        }),

    getFriendgroups: publicProcedure
        .query(async ({ ctx}) => {
            if (!ctx.session?.user) {
                return { error: 'Not authenticated' }
            }
            const groups = await ctx.prisma.friendGroup.findMany({ where: { members: { some: { userId: (ctx.session.user as any).id } } } })
            return {data: groups}
        }),

    updateDefaultGroup: publicProcedure
        .input(
            z.object({
                groupId: z.string()
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { groupId } = input

            if (!ctx.session?.user) {
                return { error: 'Not authenticated' }
            }

            return { 
                data: await ctx.prisma.user.update({
                    where: { id: (ctx.session.user as any).id },
                    data: { defaultFriendGroupId: groupId }
                })
            }
        }),
})
