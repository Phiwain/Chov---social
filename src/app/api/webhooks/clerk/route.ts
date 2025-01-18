import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from "@/libery/client";

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Get headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    // Get body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt: WebhookEvent

    // Verify payload with headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
            status: 400,
        })
    }

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
   // console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  //  console.log('Webhook payload:', body)

    if(eventType === 'user.created') {
        try {
             await prisma.user.create({
                 data:{
                     id:evt.data.id,
                     username: evt.data.username ?? "unnamed_user",
                     avatar: JSON.parse(body).data.image_url  || "/noAvatar.png",
                     cover: "/noCover.png",
                 }
             })
            return new Response('Nouvel utilisateur enregistré !', {status: 200})
        }catch(err){
            console.error('Impossible de créer un nouvel utilisateur', {status: 500 })
        }
    }
    if(eventType === 'user.updated') {
        try {
            await prisma.user.update({
                where:{
                    id:evt.data.id,
                },
                data:{
                    username: JSON.parse(body).data.username,
                    avatar: JSON.parse(body).data.image_url  || "/noAvatar.png",
                    cover: "/noCover.png",
                }
            })
            return new Response('Nouvel utilisateur modifié !', {status: 200})
        }catch(err){
            console.error("Impossible de modifier l'utilisateur", {status: 500 })
        }
    }
    return new Response('Webhook recu', { status: 200 })
}