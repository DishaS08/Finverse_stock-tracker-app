'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
    if (!email) return [];

    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error('MongoDB connection not found');

        // Better Auth stores users in the "user" collection
        const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

        if (!user) return [];

        const userId = (user.id as string) || String(user._id || '');
        if (!userId) return [];

        const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
        return items.map((i) => String(i.symbol));
    } catch (err) {
        console.error('getWatchlistSymbolsByEmail error:', err);
        return [];
    }
}

export async function toggleWatchlist(symbol: string, company: string, isWatchlisted: boolean) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            throw new Error("Unauthorized");
        }

        const userId = session.user.id;
        await connectToDatabase();

        if (isWatchlisted) {
            // Remove from watchlist
            await Watchlist.findOneAndDelete({ userId, symbol });
            return { success: true, added: false };
        } else {
            // Add to watchlist
            await Watchlist.create({
                userId,
                symbol,
                company,
                addedAt: new Date()
            });
            return { success: true, added: true };
        }
    } catch (error) {
        console.error('toggleWatchlist error:', error);
        return { success: false, error: 'Failed to update watchlist' };
    }
}

export async function checkIsWatchlisted(symbol: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return false;
        }

        const userId = session.user.id;
        await connectToDatabase();

        const item = await Watchlist.findOne({ userId, symbol });
        return !!item;
    } catch (error) {
        console.error('checkIsWatchlisted error:', error);
        return false;
    }
}

export async function getWatchlist(userId: string) {
    try {
        await connectToDatabase();
        const watchlist = await Watchlist.find({ userId }).sort({ addedAt: -1 }).lean();
        return JSON.parse(JSON.stringify(watchlist));
    } catch (error) {
        console.error('getWatchlist error:', error);
        return [];
    }
}