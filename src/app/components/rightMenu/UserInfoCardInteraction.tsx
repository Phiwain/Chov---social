"use client";

import { switchBlock, switchFollow } from "@/libery/action";
import { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
                                     userId,
                                     isUserBlocked,
                                     isFollowing,
                                     isFollowingSent,
                                 }: {
    userId: string;
    isUserBlocked: boolean;
    isFollowing: boolean;
    isFollowingSent: boolean;
}) => {
    // Initialisation de l'état local et optimiste
    const [userState, setUserState] = useState({
        following: isFollowing,
        blocked: isUserBlocked,
        followingRequestSent: isFollowingSent,
    });

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

    const follow = async () => {
        switchOptimisticState("follow");
        try {
            await switchFollow(userId);
            setUserState((prev) => ({
                ...prev,
                following: !prev.following,
                followingRequestSent: !prev.following && !prev.followingRequestSent,
            }));
        } catch (err) {
            console.error("Erreur lors du suivi :", err);
        }
    };

    const block = async () => {
        switchOptimisticState("block");
        try {
            await switchBlock(userId);
            setUserState((prev) => ({
                ...prev,
                blocked: !prev.blocked,
            }));
        } catch (err) {
            console.error("Erreur lors du blocage :", err);
        }
    };

    return (
        <div className="flex flex-col items-end space-y-2">
            {/* Bouton pour suivre ou annuler une demande */}
            <button
                type="button"
                onClick={follow}
                className="w-full bg-blue-500 text-white text-sm rounded-md p-2"
            >
                {optimisticState.following
                    ? "Suivi"
                    : optimisticState.followingRequestSent
                        ? "Demande d'ami envoyé"
                        : "Suivre"}
            </button>

            {/* Bouton pour bloquer ou débloquer */}
            <button
                type="button"
                onClick={block}
                className="text-red-400 text-xs cursor-pointer"
            >
                {optimisticState.blocked ? "Débloquer l'utilisateur" : "Bloquer l'utilisateur"}
            </button>
        </div>
    );
};

export default UserInfoCardInteraction;
