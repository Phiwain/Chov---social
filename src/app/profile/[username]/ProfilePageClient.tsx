"use client";

import Image from "next/image";
import Feed from "@/app/components/Feed";
import LeftMenu from "@/app/components/LeftMenu";
import RightMenu from "@/app/components/RightMenu";

type User = {
    id: string;
    username: string;
    name?: string;
    surname?: string;
    avatar?: string;
    cover?: string;
    _count: {
        followers: number;
        followings: number;
        posts: number;
    };
};

/**
 * Composant pour afficher une statistique utilisateur
 */
const UserStat = ({ count, label }: { count: number; label: string }) => (
    <div className="flex flex-col items-center">
        <span className="font-medium">{count}</span>
        <span className="text-sm">{label}</span>
    </div>
);

/**
 * Composant client pour afficher le profil utilisateur
 */
const ProfilePageClient = ({ user }: { user: User }) => {
    const {
        username,
        name,
        surname,
        avatar = "/default-avatar.png",
        cover = "/default-cover.jpg",
        _count: { followers = 0, followings = 0, posts = 0 },
    } = user;

    return (
        <div className="flex gap-6 pt-6">
            {/* Menu de gauche */}
            <div className="hidden xl:block w-[20%]">
                <LeftMenu type="profile" />
            </div>

            {/* Contenu principal */}
            <div className="w-full lg:w-[70%] xl:w-[50%]">
                <div className="flex flex-col gap-6">
                    {/* Section profil */}
                    <div className="flex flex-col items-center justify-center">
                        {/* Image de couverture et avatar */}
                        <div className="w-full h-64 relative">
                            <Image
                                src={cover}
                                alt={`${username}'s cover`}
                                fill
                                className="rounded-md object-cover"
                            />
                            <Image
                                src={avatar}
                                alt={`${username}'s avatar`}
                                width={128}
                                height={128}
                                className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover"
                            />
                        </div>

                        {/* Nom d'utilisateur */}
                        <h1 className="mt-20 mb-4 text-2xl font-medium">
                            {name && surname ? `${name} ${surname}` : username}
                        </h1>

                        {/* Statistiques utilisateur */}
                        <div className="flex items-center justify-center gap-12 mb-4">
                            <UserStat count={posts} label="Publications" />
                            <UserStat count={followers} label="Followers" />
                            <UserStat count={followings} label="Personnes suivies" />
                        </div>
                    </div>

                    {/* Feed */}
                    <Feed />
                </div>
            </div>

            {/* Menu de droite */}
            <div className="hidden lg:block w-[30%]">
                <RightMenu user={user} />
            </div>
        </div>
    );
};

export default ProfilePageClient;
