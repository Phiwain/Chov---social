import { notFound } from "next/navigation";
import { getUserProfile} from "@/libery/fetchProfileData";
import ProfilePageClient from "./ProfilePageClient";
import { auth } from "@clerk/nextjs/server"; // Correctement utilisé ici, car c'est un Server Component.

const ProfilePage = async ({ params }: { params: { username: string } }) => {
    const { username } = params;

    // Récupération de l'utilisateur connecté
    const { userId: currentUserId } = auth();

    // Récupérer les données utilisateur
    const user = await getUserProfile(username);

    // Vérifiez si l'utilisateur existe
    if (!user || !user.username) {
        console.error("User not found or invalid:", user); // Log pour déboguer
        return notFound();
    }

    // Vérifier si l'utilisateur est bloqué
    const isBlocked = currentUserId ? await isUserBlocked(user.id, currentUserId) : false;
    if (isBlocked) {
        console.error(`User ${username} is blocked by the current user.`);
        return notFound();
    }

    // Passer les données utilisateur au composant client
    return <ProfilePageClient user={user} />;
};

export default ProfilePage;
