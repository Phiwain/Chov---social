import prisma from "@/libery/client";

/**
 * Récupère les informations d'un utilisateur par son nom d'utilisateur.
 * @param username - Le nom d'utilisateur à rechercher.
 * @param includeCounts - Indique si les données `_count` (followers, followings, posts) doivent être incluses. Par défaut `true`.
 * @returns Les données de l'utilisateur ou `null` si non trouvé.
 */
export async function getUserProfile(username: string, includeCounts: boolean = true) {
    try {
        if (!username) {
            throw new Error("Username is required");
        }

        const user = await prisma.user.findFirst({
            where: { username },
            include: includeCounts
                ? {
                    _count: {
                        select: {
                            followers: true,
                            followings: true,
                            posts: true,
                        },
                    },
                }
                : undefined,
        });

        return user;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw new Error("Failed to fetch user profile");
    }
}

/**
 * Vérifie si un utilisateur est bloqué par un autre utilisateur.
 * @param userId - L'ID de l'utilisateur à vérifier.
 * @param currentUserId - L'ID de l'utilisateur connecté.
 * @returns `true` si l'utilisateur est bloqué, sinon `false`.
 */
export async function isUserBlocked(userId: string, currentUserId: string) {
    try {
        if (!userId || !currentUserId) {
            throw new Error("Both userId and currentUserId are required");
        }

        const block = await prisma.block.findFirst({
            where: {
                blockerId: userId,
                blockedId: currentUserId,
            },
        });

        return !!block; // Retourne `true` si un blocage existe, sinon `false`
    } catch (error) {
        console.error("Error checking block status:", error);
        throw new Error("Failed to check block status");
    }
}
