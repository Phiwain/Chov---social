
import Link from "next/link";
import Image from "next/image";
import {User} from "@prisma/client";
import {auth} from "@clerk/nextjs/server";
import prisma from "@/libery/client";
import UserInfoCardInteraction from "@/app/components/rightMenu/UserInfoCardInteraction";

const UserInfoCard = async ({user}:{user: User}) => {
     let isUserBlocked = false;
     let isFollowing = false;
     let isFollowingSent = false;

     const {userId:currentUserId} = auth();

     if (currentUserId){
         const blockRes = await prisma.block.findFirst({
             where: {
                 blockerId:currentUserId,
                 blockedId:user.id
             }
         });
         blockRes ? isUserBlocked = true : isUserBlocked = false
         const followRes = await prisma.follower.findFirst({
             where: {
                 followerId:currentUserId,
                 followingId:user.id
             }
         });
         followResRes ? isFollowing = true : isFollowing = false
         const followReqRes = await prisma.followRequestfindFirst({
             where: {
                 senderId:currentUserId,
                 receiverId:user.id
             }
         });
         followReqRes ? isFollowingSent = true : isFollowingSent = false
     }




    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
            <div className='flex justify-between items-center font-medium'>
                <span className='text-gray-500'>Informations utilisateur</span>
                <Link href='/public' className='text-blue-500 text-xs'>Tout voir</Link>
            </div>
            <div className='flex flex-col gap-4 text-gray-500'>
                <div className='flex items-center gap-2'>
                    <span className='text-xl text-black'>{user.name && user.surname ? `${user.name} ${user.surname}` : username}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <Image src="/school.png" alt="" width={16} height={16}/>
                    <span>Métier: <b>{user.work}</b></span>
                </div>
                <div className='flex items-center gap-2'>
                    <Image src="/work.png" alt="" width={16} height={16}/>
                    <span>Service: <b>{user.service}</b></span>
                </div>
                <UserInfoCardInteraction userId={user.id}
                                         currentUserId={currentUserId}
                                         isUserBlocked={isUserBlocked}
                                         isFollowing={isFollowing}
                                         isFollowingSent={isFollowingSent} />
            </div>
        </div>
    )
}

export default UserInfoCard