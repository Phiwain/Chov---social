
import prisma from "@/libery/client";

export async function getUserData(userId: string) {
    return await prisma.user.findFirst({
        where: {
            id: userId,
        },
        include: {
            _count: {
                select: {
                    followers: true,
                },
            },
        },
    });
}
