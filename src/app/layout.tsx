import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CHOV Social - Intranet",
    description: "Intranet du CHOV",
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider localization={frFR}>
            <html lang="fr">
            <body className={inter.className}>
            <div className="w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
                <Navbar />
            </div>
            <div className=" bg-slate-100 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
                {children}
            </div>
            </body>
            </html>
        </ClerkProvider>
    );
}
