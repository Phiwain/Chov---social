import Link from "next/link";
import Image from "next/image";
import {auth} from "@clerk/nextjs/server";
import prisma from "@/libery/client";
import FriendrequestList from "@/app/components/rightMenu/FriendRequestList";

const FriendRequests = async () => {
    const {userId} = auth()

    if (!userId) return null;

    const requests = await prisma.followRequest.findMany({
        where: {
            receiverId: userId
        },
        include:{
            sender:true,
        }
        });
    if(requests.length === 0)return null;

    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
            <div className='flex justify-between items-center font-medium'>
                <span className='text-gray-500'>Demande d'amis</span>
                <Link href='/public' className='text-blue-500 text-xs'>Tout voir</Link>
            </div>
           <FriendrequestList requests={requests} />

        </div>

    )
}

export default FriendRequests