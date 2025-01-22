"use client";

import {auth} from "@clerk/nextjs/server";
import {useAuth} from "@clerk/nextjs";



export default  function TestPage() {
    const { userId, sessionId, getToken } = useAuth();
    console.log("auth =>", { userId, sessionId });

    // Redirection si pas connecté
    if (!userId) {
        return (
            <main>
                <p>Pas connecté !</p>
            </main>
        );
    }

    return (
        <main>
            <p>Connecté : userId = {userId}</p>
        </main>
    );
}
