import { notFound } from "next/navigation";
import { getUserProfile } from "@/libery/fetchProfileData";
import ProfilePageClient from "./ProfilePageClient";
import { auth } from "@clerk/nextjs/server"; // Utilisé correctement dans un Server Component
import { switchBlock} from "@/libery/action"; // Exemple pour la fonction de blocage

const ProfilePage = async ({ params }: { params: { username: string } }) => {
    const { username } = await Promise.resolve(params); // Assurez-vous que `params` est résolu avant l'accès

    // Récupération de l'utilisateur connecté
    const { userId: currentUserId } = auth();

    // Récupérer les données utilisateur
    const user = await getUserProfile(username);

    // Vérifiez si l'utilisateur existe
    if (!user || !user.username) {
        console.error("User not found or invalid:", user);
        return notFound();
    }

    // Vérifier si l'utilisateur est bloqué
    const isBlocked = currentUserId ? await switchBlock(user.id, currentUserId) : false;
    if (isBlocked) {
        console.error(`User ${username} is blocked by the current user.`);
        return notFound();
    }

    // Passer les données utilisateur au composant client
    return <ProfilePageClient user={user} />;
};

export default ProfilePage;
