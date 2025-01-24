import Image from "next/image";
import LeftMenu from "@/app/components/leftMenu/LeftMenu";
import RightMenu from "@/app/components/rightMenu/RightMenu";
import Feed from "@/app/components/feed/Feed";

interface User {
    id: string;
    username: string;
    name?: string;
    surname?: string;
    avatar?: string;
    cover?: string;
    _count: {
        posts: number;
        followers: number;
        followings: number;
    };
}

const ProfilePageClient = ({ user }: { user: User }) => {
    const {
        cover = "noCover.png",
        avatar = "noAvatar.png",
        name = "",
        surname = "",
        username = "User",
        _count = { posts: 0, followers: 0, followings: 0 },
    } = user || {};

    console.log("User data in ProfilePageClient:", user);

    return (
        <div className="flex gap-6 pt-6">
            {/* Menu de gauche */}
            <div className="hidden xl:block w-[20%]">
                <LeftMenu type="profile" />
            </div>

            {/* Contenu principal */}
            <div className="w-full lg:w-[70%] xl:w-[50%]">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full h-64 relative">
                            <Image
                                src={cover}
                                alt={`${username}'s cover`}
                                fill
                                className="rounded-md object-cover"
                                loading="lazy"
                            />
                            <Image
                                src={avatar}
                                alt={`${username}'s avatar`}
                                width={128}
                                height={128}
                                className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover"
                                loading="lazy"
                            />
                        </div>

                        <h1 className="mt-20 mb-4 text-2xl font-medium">
                            {name && surname ? `${name} ${surname}` : username}
                        </h1>

                        <div className="flex items-center justify-center gap-12 mb-4">
                            <div className="flex flex-col items-center">
                                <span className="font-medium">{_count.posts}</span>
                                <span className="text-sm">Posts</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-medium">{_count.followers}</span>
                                <span className="text-sm">Followers</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-medium">{_count.followings}</span>
                                <span className="text-sm">Following</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feed */}
                <Feed />
            </div>

            {/* Menu de droite */}
            <div className="hidden lg:block w-[30%]">
                <RightMenu user={user} />
            </div>
        </div>
    );
};

export default ProfilePageClient;
