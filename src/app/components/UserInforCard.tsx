
import Link from "next/link";
import Image from "next/image";

const UserInfoCard = ({userId}:{userId:string}) => {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
            <div className='flex justify-between items-center font-medium'>
                <span className='text-gray-500'>Informations utilisateur</span>
                <Link href='/' className='text-blue-500 text-xs'>Tout voir</Link>
            </div>
            <div className='flex flex-col gap-4 text-gray-500'>
                <div className='flex items-center gap-2'>
                    <span className='text-xl text-black'>Sebastien RONDOT</span>
                </div>
                <div className='flex items-center gap-2'>
                    <Image src="/school.png" alt="" width={16} height={16}/>
                    <span>Métier: <b>Manipulateur radio</b></span>
                </div>
                <div className='flex items-center gap-2'>
                    <Image src="/work.png" alt="" width={16} height={16}/>
                    <span>Service: <b>Imagerie Médicale</b></span>
                </div>
                <button className="bg-blue-500 text-white text-sm rounded-md p-2">Suivre l'utilisateur</button>
                <span className="text-red-600 self-end text-xs cursor-pointer">Bloquer l'utilisateur</span>
            </div>
        </div>
    )
}

export default UserInfoCard