
import { getUserData } from "@/libery/fetchUser";
import ProfileCardClient from "./ProfileCardClient";

const ProfileCard = async () => {
    // @ts-ignore
    const { userId } = await import("@clerk/nextjs/server").then((mod) => mod.auth());

    if (!userId) return null;

    const user = await getUserData(userId);
    if (!user) return null;

    return <ProfileCardClient user={user} />;
};

export default ProfileCard;
