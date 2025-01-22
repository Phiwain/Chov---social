import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/libery/client";

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;

    //   Vérification de la clé secrète
    if (!SIGNING_SECRET) {
        console.error("Error: SIGNING_SECRET is missing.");
        return new Response("Error: SIGNING_SECRET is not set.", { status: 500 });
    }

    // Initialisation du webhook Svix
    const wh = new Webhook(SIGNING_SECRET);

    // Extraction des headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // Vérification des headers requis
    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error("Error: Missing Svix headers.");
        return new Response("Error: Missing Svix headers.", { status: 400 });
    }

    // Lecture du corps de la requête
    const payload = await req.json();
    const body = JSON.stringify(payload);

    let evt: WebhookEvent;

    // Vérification de la validité du webhook
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error: Could not verify webhook:", err);
        return new Response("Error: Verification failed.", { status: 400 });
    }
    console.log("Webhook verified:", evt);
    // Traitement des événements
    const eventType = evt.type;

    if (eventType === "user.created") {
        try {
            await prisma.user.create({
                data: {
                    id: evt.data.id,
                    username: evt.data.username ?? "unnamed_user",
                    avatar: evt.data.image_url || "/noAvatar.png",
                    cover: "/noCover.png",
                },
            });
            return new Response("User created successfully.", { status: 200 });
        } catch (err) {
            console.error("Error creating user:", err);
            return new Response("Error: Could not create user.", { status: 500 });
        }
    }

    if (eventType === "user.updated") {
        try {
            await prisma.user.update({
                where: {
                    id: evt.data.id,
                },
                data: {
                    username: evt.data.username || "unnamed_user",
                    avatar: evt.data.image_url || "/noAvatar.png",
                    cover: "/noCover.png",
                },
            });
            return new Response("User updated successfully.", { status: 200 });
        } catch (err) {
            console.error("Error updating user:", err);
            return new Response("Error: Could not update user.", { status: 500 });
        }
    }
    if (eventType === "user.deleted") {
        try {
            await prisma.user.delete({
                where: {
                    id: evt.data.id,
                },
            });
            return new Response("User deleted successfully.", { status: 200 });
        } catch (err) {
            console.error("Error deleting user:", err);
            return new Response("Error: Could not delete user.", { status: 500 });
        }
    }

    // Réponse par défaut
    return new Response("Webhook received.", { status: 200 });
}
