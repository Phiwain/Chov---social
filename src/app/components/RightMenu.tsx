import FriendRequests from "@/app/components/FriendRequests";
import UserInfoCard from "@/app/components/UserInforCard";

const RightMenu = ({userId}:{userId?:string}) => {
    return (
        <div className='flex flex-col gap-6'>
            {userId ? (<>
                <UserInfoCard userId={userId}/>
                </>) : null}
            <FriendRequests/>
        </div>
    )
}

export default RightMenu