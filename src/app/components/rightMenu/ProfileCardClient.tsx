"use client";

import Image from "next/image";
import Link from "next/link";

type User = {
    id: string;
    username: string;
    name?: string;
    surname?: string;
    avatar?: string;
    cover?: string;
    _count: {
        followers: number;
    };
};

const ProfileCardClient = ({ user }: { user: User }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
            <div className="h-20 relative">
                <Image
                    src={user.cover || "/noCover.png"}
                    alt=""
                    fill
                    className="rounded-md object-cover"
                />
                <Image
                    src={user.avatar || "/noAvatar.png"}
                    alt=""
                    width={48}
                    height={48}
                    className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
                />
            </div>
            <div className=" flex flex-col gap-2 items-center">
        <span className="font-semibold">
          {user.name && user.surname
              ? `${user.name} ${user.surname}`
              : user.username}
        </span>
                <span className="text-xs text-gray-500">
          {user._count.followers} Personnes
        </span>
            </div>
            <Link href={`/profile/${user.username}`} className='flex justify-center'>
                <button className="bg-blue-500 text-white text-xs p-2 rounded-md">
                    Mon Profil
                </button>
            </Link>
        </div>
    );
};

export default ProfileCardClient;
