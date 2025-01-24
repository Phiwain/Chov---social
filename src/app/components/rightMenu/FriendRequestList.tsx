"use client"

import Image from "next/image";
import {FollowRequest, User} from "@prisma/client";
import {request} from "node:http";

type RequestWithUser = FollowRequest & {
    sender: User
}
const FriendrequestList = ({requests}:{requests:RequestWithUser[]}) =>{
    return (
        <div>
            {requests.map(request=>(
                <div className='flex items-center justify-between' key={request.id}>
                    <div className='flex items-center gap-4'>
                        <Image
                            src="https://images.pexels.com/photos/4005448/pexels-photo-4005448.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                            alt="friend" width={40} height={40} className='w-10 h-10 rounded-full object-cover'/>
                        <span className="font-semibold">Jean Christophe MORTAS</span>
                    </div>
                    <div className='flex gap-3 justify-end'>
                        <Image src="/accept.png" alt="" width={20} height={20} className='cursor-pointer'/>
                        <Image src="/reject.png" alt="" width={20} height={20} className='cursor-pointer'/>
                    </div>
                </div>

            ))}
        </div>

    )
}

export default FriendrequestList