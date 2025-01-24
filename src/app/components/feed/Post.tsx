import Image from "next/image";
import Comments from "@/app/components/feed/Comments";


const Post = () => {
    return (
        <div className='flex flex-col gap-4'>
            {/* Utilisateur */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image src='https://images.pexels.com/photos/30157573/pexels-photo-30157573/free-photo-of-homme-decontracte-appuye-sur-la-balustrade-d-un-balcon-a-l-exterieur.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load'
                           width={40} height={40} alt="" className="w-10 h-10 rounded-full" />
                    <span className="font-medium">Sebastien RONDOT</span>
                </div>
                <Image src="/more.png" width={16} height={16} alt=""  />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-4">
                <div className="w-full min-h-96 relative">
                    <Image src='https://images.pexels.com/photos/30075407/pexels-photo-30075407/free-photo-of-vue-panoramique-du-port-de-nyhavn-sous-la-lumiere-hivernale.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load'
                           fill alt="" className="object-cover rounded-md"  />
                </div>
                <p>Superasset aereis monstravit quidam carentibus quod ob quam minima primo memorat mussitare primo delatum sensu statuas inbracteari bonos gloriae Censorius arduos superasset Cato ambigere autem quam factorum haec easque autem.</p>
            </div>
            {/* interactions */}
            <div className="flex items-center justify-between text-sm my-4">
                <div className='flex gap-8'>
                    <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
                        <Image src="/like.png" width={16} height={16} alt="" className="cursor-pointer"/>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">12 <span className="hidden md:inline"> J'aime</span></span>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
                        <Image src="/comment.png" width={16} height={16} alt="" className="cursor-pointer"/>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">12 <span className="hidden md:inline"> Commentaires</span></span>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
                    <Image src="/share.png" width={16} height={16} alt="" className="cursor-pointer"/>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">12 <span className="hidden md:inline"> Partages</span></span>
                </div>
            </div>

        <Comments/>
        </div>
    )
}

export default Post