import Image from "next/image";

const ProfileCard = () => {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6'>
            <div className="h-20 relative">
                <Image src="https://images.pexels.com/photos/30164274/pexels-photo-30164274/free-photo-of-charmante-vieille-maison-en-pierre-avec-des-fleurs-en-fleurs.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                       alt="" fill className="rounded-md object-cover"/>
                <Image src="https://images.pexels.com/photos/30157573/pexels-photo-30157573/free-photo-of-homme-decontracte-appuye-sur-la-balustrade-d-un-balcon-a-l-exterieur.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                       alt="" width={48} height={48}  className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"/>
            </div>
            <div className='h-20 flex flex-col gap-2 items-center'>
                <span className='font-semibold'>Sébastien RONDOT</span>
                <span className='text-xs text-gray-500'>Suivi par 20 personnes</span>
                <button className="bg-blue-500 text-white text-xs p-2 rounded-md ">Mon Profil</button>
            </div>
        </div>
    )
}

export default ProfileCard