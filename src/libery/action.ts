"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";

export const switchFollow = async (userId: string) => {
    const { userId: currentUserId } = auth();

    if (!currentUserId) {
        throw new Error("User is not authenticated!");
    }

    if (!userId || typeof userId !== "string") {
        throw new Error("Invalid userId!");
    }

    try {
        return await prisma.$transaction(async (tx) => {
            const existingFollow = await tx.follower.findFirst({
                where: {
                    followerId: currentUserId,
                    followingId: userId,
                },
            });

            if (existingFollow) {
                await tx.follower.delete({ where: { id: existingFollow.id } });
                return { status: "unfollowed" };
            }

            const existingFollowRequest = await tx.followRequest.findFirst({
                where: {
                    senderId: currentUserId,
                    receiverId: userId,
                },
            });

            if (existingFollowRequest) {
                await tx.followRequest.delete({ where: { id: existingFollowRequest.id } });
                return { status: "request-cancelled" };
            }

            await tx.followRequest.create({
                data: {
                    senderId: currentUserId,
                    receiverId: userId,
                },
            });

            return { status: "request-sent" };
        });
    } catch (err) {
        console.error(`Error in switchFollow for userId: ${userId}`, err);
        throw new Error("Failed to switch follow status!");
    }
};

export const switchBlock = async (userId: string) => {
    const { userId: currentUserId } = auth();

    if (!currentUserId) {
        throw new Error("User is not authenticated!");
    }

    if (!userId || typeof userId !== "string") {
        throw new Error("Invalid userId!");
    }

    try {
        return await prisma.$transaction(async (tx) => {
            const existingBlock = await tx.block.findFirst({
                where: {
                    blockerId: currentUserId,
                    blockedId: userId,
                },
            });

            if (existingBlock) {
                await tx.block.delete({ where: { id: existingBlock.id } });
                return { status: "unblocked" };
            }

            await tx.block.create({
                data: {
                    blockerId: currentUserId,
                    blockedId: userId,
                },
            });

            return { status: "blocked" };
        });
    } catch (err) {
        console.error(`Error in switchBlock for userId: ${userId}`, err);
        throw new Error("Failed to switch block status!");
    }
};