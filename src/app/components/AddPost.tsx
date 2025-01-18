import Image from "next/image";
const AddPost = () => {




    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex items-center gap-4 text-sm">
            {/* ajout message */}
            <div className="flex-1">
                {/* texte */}
                <div className="flex gap-4">
          <textarea placeholder="Que souhaitez vous dire ?" className="flex-1 bg-slate-100 rounded-lg p-2"/>
                    <Image src="/emoji.png" alt="Emoji" width={20} height={20} className="w-5 h-5 cursor-pointer self-end"/>
                </div>
                {/* options */}
                <div className='flex items-center justify-center gap-4 mt-4 text-gray-400 flex-wrap'>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <Image src="/addimage.png" alt="" width={20} height={20}/> Photo
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <Image src="/addVideo.png" alt="" width={20} height={20}/> Vidéo
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <Image src="/addevent.png" alt="" width={20} height={20}/> Event
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <Image src="/poll.png" alt="" width={20} height={20}/> Sondage
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost