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

        console.log("Fetched user profile:", user); // Ajoutez ce log

        if (!user) return null;

        // Ajout de valeurs par défaut
        return {
            ...user,
            surname: user.surname || "", // Valeur par défaut
            _count: user._count || { followers: 0, followings: 0, posts: 0 },
        };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw new Error("Failed to fetch user profile");
    }
}
