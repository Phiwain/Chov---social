import FriendRequests from "@/app/components/rightMenu/FriendRequests";
import UserInfoCard from "@/app/components/rightMenu/UserInfoCard";
import ProfileCard from "@/app/components/rightMenu/ProfileCard";
import { User } from "@prisma/client";
import { Suspense } from "react";

const RightMenu = ({ user, type }: { user?: User; type: "home" | "profile" }) => {
    return (
        <div className='flex flex-col gap-6'>
            {/* ProfileCard s'affiche uniquement sur la page "home" */}
            {type === "home" && <ProfileCard />}
            {user ? (
                <>
                    <Suspense fallback="Chargement">
                        <UserInfoCard user={user} />
                    </Suspense>
                </>
            ) : null}
            <FriendRequests />
        </div>
    );
};

export default RightMenu;
