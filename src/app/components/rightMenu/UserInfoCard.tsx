"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import UserInfoCardInteraction from "@/app/components/rightMenu/UserInfoCardInteraction";
import UpdateUser from "@/app/components/rightMenu/updateUser";

type User = {
    id: string;
    username: string;
    name?: string;
    surname?: string;
    avatar?: string;
    service?: string;
    work?: string;
};

const UserInfoCard = ({ user }: { user: User }) => {
    const { userId: currentUserId } = useAuth();

    console.log("ID utilisateur connecté (currentUserId):", currentUserId);
    console.log("ID utilisateur visualisé (user.id):", user.id);

    // Si l'utilisateur n'est pas connecté
    if (!currentUserId) {
        return <p className="text-red-500">Vous devez être connecté pour voir ce contenu.</p>;
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
            {/* Header */}
            <div className="flex justify-between items-center font-medium">
                <span className="text-gray-500">Informations utilisateur</span>
                {currentUserId === user.id ? (
                    <UpdateUser />
                ) : (
                    <Link href="/public" className="text-blue-500 text-xs">
                        Tout voir
                    </Link>
                )}
            </div>

            {/* User Info */}
            <div className="flex flex-col gap-4 text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="text-xl text-black">
                        {user.name && user.surname
                            ? `${user.name} ${user.surname}`
                            : user.username}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Image src="/school.png" alt="School Icon" width={16} height={16} />
                    <span>Métier: <b>{user.work || "Non spécifié"}</b></span>
                </div>
                <div className="flex items-center gap-2">
                    <Image src="/work.png" alt="Work Icon" width={16} height={16} />
                    <span>Service: <b>{user.service || "Non spécifié"}</b></span>
                </div>

                {/* Interaction Buttons */}
                {currentUserId !== user.id && (
                    <UserInfoCardInteraction
                        userId={user.id}
                        isUserBlocked={false} // Ajouter la logique de blocage si nécessaire
                        isFollowing={false} // Ajouter la logique de suivi si nécessaire
                        isFollowingSent={false} // Ajouter la logique de demande si nécessaire
                    />
                )}
            </div>
        </div>
    );
};

export default UserInfoCard;
