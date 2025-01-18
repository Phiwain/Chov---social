import LeftMenu from "@/app/components/LeftMenu";
import Feed from "@/app/components/Feed";
import RightMenu from "@/app/components/RightMenu";
import Image from "next/image";

const ProfilePage = () =>{
    return (
        <div className='flex gap-6 pt-6'>
            <div className='hidden xl:block w-[20%]'>
                <LeftMenu type="profile"/>
            </div>
            <div className='w-full lg:w-[70%] xl:w-[50%]'>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='w-full h-64 relative'>
                            <Image src="https://images.pexels.com/photos/30110117/pexels-photo-30110117.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                                   alt="" fill className='rounded-md object-cover'/>
                            <Image src="https://images.pexels.com/photos/30157573/pexels-photo-30157573/free-photo-of-homme-decontracte-appuye-sur-la-balustrade-d-un-balcon-a-l-exterieur.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                                   alt="" width={128} height={128} className='w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover'/>
                        </div>
                        <h1 className='mt-20 mb-4 text-2xl font-medium'>Sébastien RONDOT</h1>
                        <div className='flex items-center justify-center gap-12 mb-4'>
                            <div className='flex flex-col items-center'>
                                <span className='font-medium'>20</span>
                                <span className='text-sm'>Pubilcations</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <span className='font-medium'>25</span>
                                <span className='text-sm'>Followers</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <span className='font-medium'>15</span>
                                <span className='text-sm'>Personnes suivies</span>
                            </div>
                        </div>
                    </div>
                    <Feed/>
                </div>
            </div>
            <div className='hidden lg:block w-[30%]'><RightMenu userId="test"/></div>
        </div>
    )
}

export default ProfilePage