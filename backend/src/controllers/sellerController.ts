import { db } from "../config/db";
import { Request, Response } from "express";
import { users } from "../drizzle/users";
import { eq } from "drizzle-orm";
import { sellerProfiles } from "../drizzle/sellerInfo";

export const registerSeller = async (req: Request, res: Response) => {
    try {
        const { accepted, bio, email, github, razorpayId } = req.body;
        if (!accepted) {
            throw new Error("Terms & Conditions not accepted");
        }

        // search the email in the users table
        const user = await db.select().from(users)
            .where(eq(users.email, email))

        if (!user) {
            throw new Error("User not found");
        }

        // if the user is already a seller
        if (user[0]?.role === "seller") {
            throw new Error("User is already a seller");
        }

        if (!user[0]?.id) {
            throw new Error("User ID not found");
        }

        // update the user role to seller
        await db.update(users).set({ role: "seller" }).where(eq(users.id, user[0]?.id));

        // create a new seller
        await db.insert(sellerProfiles).values({
            userId: user[0]?.id,
            bio,
            githubUrl: github,
            razorpayAccountId: razorpayId,
            acceptedTerms: accepted,
            isVerified: true
        });

        res.status(201).json({ success: true, message: "Seller registered successfully" });
    }
    catch (err) {
        console.error("Error registering seller:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const updateSellerInfo = async (req: Request, res: Response) => {
    try {
        const { bio, github, razorpayId, userEmail } = req.body;

        if (!userEmail) {
            throw new Error("User email not found");
        }

        // check if the userEmail is valid or not
        const user = await db.select().from(users).where(eq(users.email, userEmail));
        if (!user) {
            throw new Error("User not found");
        }

        // get the userId
        const userId = user[0]?.id;

        // check if the userId is valid or not
        if (!userId) {
            throw new Error("User ID not found");
        }

        // check if the seller profile exists
        const seller = await db.select().from(sellerProfiles).where(eq(sellerProfiles.userId, userId));
        if (!seller) {
            throw new Error("Seller not found");
        }

        // update the seller profile
        await db.update(sellerProfiles).set({
            bio,
            githubUrl: github,
            razorpayAccountId: razorpayId
        }).where(eq(sellerProfiles.userId, userId));

        res.status(200).json({ message: "Seller information updated successfully" });
    }
    catch (err) {
        console.error("Error updating seller information:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const checkUserRole = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;

        if (!email) {
            throw new Error("Email not provided");
        }

        // Check if the user exists
        const user = await db.select().from(users).where(eq(users.email, email as string));
        if (!user) {
            throw new Error("User not found");
        }

        res.status(200).json({ role: user[0]?.role });
    }
    catch (err) {
        console.error("Error checking user role:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
