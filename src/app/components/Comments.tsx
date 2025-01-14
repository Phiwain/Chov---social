import Image from "next/image";

const Comments = () => {
    return (
        <div className=''>
            {/* ecrire commentraire */}
            <div className='flex items-center gap-4'>
                <Image src="https://images.pexels.com/photos/30157573/pexels-photo-30157573/free-photo-of-homme-decontracte-appuye-sur-la-balustrade-d-un-balcon-a-l-exterieur.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                      alt='img profile' width={32} height={32} className="w-8 h-8 rounded-full" />
                <div className='flex-1 flex items-center justify-between bg-slate-100 rounded-md text-sm px-6 py-2 w-full'>
                    <input type='text' placeholder='Ecrivez un commentaire' className='bg-transparent outline-none flex-1' />
                    <Image src="/emoji.png" alt="Emoji" width={16} height={16} className="w-5 h-5 cursor-pointer"/>
                </div>
            </div>
            {/* lire commentraire */}
            <div className=''>
                {/* commentraire */}
                <div className='flex gap-4 justify-between mt-6'>
                    {/* Avatar */}
                    <Image src="https://images.pexels.com/photos/30157573/pexels-photo-30157573/free-photo-of-homme-decontracte-appuye-sur-la-balustrade-d-un-balcon-a-l-exterieur.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                           alt='img profile' width={40} height={40} className="w-10 h-10 rounded-full" />
                    {/* descritption */}
                    <div className='flex flex-col gap-2 flex-1'>
                        <span className='font-medium'>Aude Flament</span>
                        <p>Admodum agi quodam mirum memorabile agi nihil innumeram videre est serium vel innumeram
                            innumeram quodam nihil redeundum haec vel curulium.</p>
                        <div className='flex items-center gap-8 text-xs text-gray-500 mt-2'>
                            <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
                                <Image src="/like.png" width={12} height={12} alt="" className="cursor-pointer"/>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-500">12 <span
                                    className="hidden md:inline"> J'aime</span></span>
                                <div className="">Reply</div>
                            </div>
                        </div>

                    </div>
                    {/* icones */}
                    <Image src="/more.png" alt="" width={16} height={16} className="w-4 h-4 cursor-pointer "/>
                </div>
            </div>
        </div>
    )
}

export default Comments