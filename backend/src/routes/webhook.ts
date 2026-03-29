import { Router, Request, Response } from "express";
import express from "express"; // Import express to access .raw
import { Webhook } from 'svix';
import { users } from '../drizzle/schema';
import { db } from "../config/db";

const router = Router();

// Apply express.raw specifically to this POST endpoint
router.post('/user-created', express.raw({ type: 'application/json' }), async (req: Request, res: Response): Promise<any> => {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET');
    return res.status(500).json({ error: 'Missing CLERK_WEBHOOK_SECRET' });
  }

  // Get the headers from Svix
  const svix_id = req.headers["svix-id"] as string;
  const svix_timestamp = req.headers["svix-timestamp"] as string;
  const svix_signature = req.headers["svix-signature"] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Missing svix headers' });
  }

  // req.body is a Buffer because of express.raw()
  const payload = req.body.toString();
  const wh = new Webhook(SIGNING_SECRET);

  let evt: any;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err: any) {
    console.error('Error verifying webhook:', err.message);
    return res.status(400).json({ success: false, message: 'Verification failed' });
  }

  // Handle the logic
  if (evt.type === 'user.created') {
    const { id, email_addresses, first_name, last_name, public_metadata } = evt.data;
    
    const email = email_addresses?.[0]?.email_address || '';
    const name = `${first_name || ''} ${last_name || ''}`.trim();
    
    // Extract the role from metadata (default to 'buyer' if not set)
    const role = (public_metadata?.role as 'buyer' | 'seller') || 'buyer';

    try {
      await db.insert(users).values({
        clerkId: id,
        email,
        name: name || null,
        role: role // Uses the role passed from the frontend via Clerk
      });
      console.log(`✅ Synced ${role}: ${id} to database`);
    } catch (dbErr) {
      console.error('❌ Database insertion failed:', dbErr);
      return res.status(500).json({ success: false, error: 'Database error' });
    }
  }

  return res.status(200).json({ success: true });
});

export default router;