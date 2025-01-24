
import Link from "next/link";
import Image from "next/image";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
    return (
        <div className='flex flex-col gap-6'>
            <div className='p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2'>
                <Link href="/public" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="/posts.png" alt="" width={20} height={20}/>
                    <span>Mes publications</span>
                </Link>
                <hr className="border-t-1 borderd-gay-50 w-36 self-center"/>
                <Link href="/public" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="/news.png" alt="" width={20} height={20}/>
                    <span>Mail: pulsy</span>
                </Link>
                <hr className="border-t-1 borderd-gay-50 w-36 self-center"/>
                <Link href="/public" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">
                    <Image src="/settings.png" alt="" width={20} height={20}/>
                    <span>Réglages</span>
                </Link>
                <hr className="border-t-1 borderd-gay-50 w-36 self-center"/>
            </div>
        </div>
    )
}

export default LeftMenu