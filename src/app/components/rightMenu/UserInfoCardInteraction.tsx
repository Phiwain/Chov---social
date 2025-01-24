"use client";

import { switchBlock, switchFollow } from "@/libery/action";
import { useOptimistic, useState, useCallback } from "react";

type UserInfoCardInteractionProps = {
    userId: string;
    isUserBlocked: boolean;
    isFollowing: boolean;
    isFollowingSent: boolean;
};

const UserInfoCardInteraction = ({
                                     userId,
                                     isUserBlocked,
                                     isFollowing,
                                     isFollowingSent,
                                 }: UserInfoCardInteractionProps) => {
    // État optimiste initial
    const [userState, setUserState] = useState({
        following: isFollowing,
        blocked: isUserBlocked,
        followingRequestSent: isFollowingSent,
    });

    // Gestion optimiste
    const [optimisticState, switchOptimisticState] = useOptimistic(
        userState,
        (state, value: "follow" | "block") =>
            value === "follow"
                ? {
                    ...state,
                    following: !state.following,
                    followingRequestSent: !state.followingRequestSent && !state.following,
                }
                : { ...state, blocked: !state.blocked }
    );

    // Action de suivi
    const follow = useCallback(async () => {
        switchOptimisticState("follow");
        try {
            const result = await switchFollow(userId);

            setUserState((prev) => {
                if (result.status === "unfollowed") {
                    return { ...prev, following: false };
                } else if (result.status === "request-sent") {
                    return { ...prev, followingRequestSent: true };
                } else if (result.status === "request-cancelled") {
                    return { ...prev, followingRequestSent: false };
                }
                return prev;
            });
        } catch (err) {
            console.error("Erreur lors du suivi :", err);
            // Affiche une erreur ou réinitialise l'état optimiste
            switchOptimisticState("follow");
        }
    }, [userId, switchOptimisticState]);

    // Action de blocage
    const block = useCallback(async () => {
        switchOptimisticState("block");
        try {
            await switchBlock(userId);
            setUserState((prev) => ({
                ...prev,
                blocked: !prev.blocked,
            }));
        } catch (err) {
            console.error("Erreur lors du blocage :", err);
            // Affiche une erreur ou réinitialise l'état optimiste
            switchOptimisticState("block");
        }
    }, [userId, switchOptimisticState]);

    return (
        <div className="flex flex-col items-end space-y-2">
            {/* Bouton Follow */}
            <button
                type="button"
                onClick={follow}
                aria-label={
                    optimisticState.following
                        ? "Arrêter de suivre cet utilisateur"
                        : optimisticState.followingRequestSent
                            ? "Annuler la demande de suivi"
                            : "Suivre cet utilisateur"
                }
                className={`w-full text-white text-sm rounded-md p-2 ${
                    optimisticState.following
                        ? "bg-gray-400 hover:bg-gray-500"
                        : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
                {optimisticState.following
                    ? "Suivi"
                    : optimisticState.followingRequestSent
                        ? "Demande d'ami envoyé"
                        : "Suivre"}
            </button>

            {/* Bouton Block */}
            <button
                type="button"
                onClick={block}
                aria-label={
                    optimisticState.blocked
                        ? "Débloquer cet utilisateur"
                        : "Bloquer cet utilisateur"
                }
                className={`text-xs cursor-pointer ${
                    optimisticState.blocked
                        ? "text-green-500 hover:text-green-600"
                        : "text-red-400 hover:text-red-500"
                }`}
            >
                {optimisticState.blocked ? "Débloquer l'utilisateur" : "Bloquer l'utilisateur"}
            </button>
        </div>
    );
};

export default UserInfoCardInteraction;
