import { notFound } from "next/navigation";
import { getUserProfile, isUserBlocked } from "@/libery/fetchProfileData";
import ProfilePageClient from "./ProfilePageClient";
import { auth } from "@clerk/nextjs/server";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
    const { username } = params;

    // Récupération de l'utilisateur connecté
    const { userId: currentUserId } = auth();

    // Récupérer les données utilisateur
    const user = await getUserProfile(username);
    if (!user) {
        return notFound();
    }

    // Vérifier si l'utilisateur est bloqué
    const isBlocked = currentUserId ? await isUserBlocked(user.id, currentUserId) : false;
    if (isBlocked) {
        return notFound();
    }

    // Passer les données utilisateur au composant client
    return <ProfilePageClient user={user} />;
};

export default ProfilePage;