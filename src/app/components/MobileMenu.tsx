"use client"

import Link from "next/link";
import { useState } from 'react';


const MobileMenu = () =>{
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='md:hidden'>
            <div className="flex flex-col gap-[4.5px] cursor-pointer" onClick={() => setIsOpen((prev => !prev))}>
                <div className={`w-6 h-1 bg-blue-900 rounded-sm ${isOpen ? "rotate-45" : ""} origin-left ease-in-out duration-500`}/>
                <div className={`w-6 h-1 bg-blue-900 rounded-sm ${isOpen ? "opacity-0" : ""} `}/>
                <div className={`w-6 h-1 bg-blue-900 rounded-sm ${isOpen ? "-rotate-45" : ""} origin-left ease-in-out duration-500`}/>
            </div>
            {isOpen && (
                <div className=' absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10'>
                    <Link href='/'>Page d'accueil</Link>
                    <Link href='/'>Amis</Link>
                    <Link href='/'>Groupes</Link>
                    <Link href='/'>Stories</Link>

                </div>
            )}
        </div>
    )
}

export default MobileMenu