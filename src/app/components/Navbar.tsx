

import Link from "next/link";
import Image from "next/image";
import MobileMenu from "@/app/components/MobileMenu";
import {ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton} from "@clerk/nextjs";

const Navbar = () => {
    return (
        <nav className="h-24 flex items-center justify-between px-4">
            {/* Logo ou titre du site */}
            <div className="md:hidden lg:block w-[20%]">

                <Link href="/" className=" font-bold text-xl text-blue-900">
                    Intranet - CHOV
                </Link>
            </div>

            {/* Menu desktop visible à partir de 'md' */}
            <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
                <div className="flex gap-6 text-gray-600">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/home.png"
                            alt="Page d'accueil"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                        <span>Page d'accueil</span>
                    </Link>

                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/friends.png"
                            alt="Amis"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                        <span>Amis</span>
                    </Link>

                </div>
                <div className="hidden lg:flex p-1 bg-slate-100 items-center rounded-xl">
                    <input
                        type="text"
                        placeholder="recherche ..."
                        className="bg-transparent outline-none"
                    />
                    <Image src="/search.png" alt="search" width={14} height={14}/>
                </div>

            </div>

            <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
                <ClerkLoading>
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"></div>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn >
                        <div className="cursor-pointer">
                            <Image src="/people.png" width={24} height={24} alt="Connection"/>
                        </div>
                        <div className="cursor-pointer">
                            <Image src="/messages.png" width={20} height={20} alt="Messages"/>
                        </div>
                        <div className="cursor-pointer">
                            <Image src="/notifications.png" width={20} height={20} alt="notifications"/>
                        </div>
                        <UserButton/>
                    </SignedIn>
                    <SignedOut>
                        <div className=" flex items-center gap-2 text-sm">
                            <Image src="/login.png" width={20} height={20} alt="connection"/>
                            <Link href="/sign-in">Connection / Enregistrement</Link>
                        </div>
                    </SignedOut>
                </ClerkLoaded>
                <MobileMenu/>
            </div>
        </nav>
    );
};

export default Navbar;
