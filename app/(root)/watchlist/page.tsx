import { auth } from '@/lib/better-auth/auth';
import { getWatchlist } from '@/lib/actions/watchlist.actions';
import { headers } from 'next/headers';
import WatchlistGrid from '@/components/WatchlistGrid';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const WatchlistPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) redirect('/sign-in');

    const watchlist = await getWatchlist(session.user.id);

    return (
        <section className="flex flex-col gap-10">
            <h1 className="text-3xl font-bold text-white">Your Watchlist</h1>

            {watchlist.length > 0 ? (
                <WatchlistGrid watchlist={watchlist} />
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-gray-400 mb-6 text-lg">Your watchlist is empty. Add stocks to track them here.</p>
                    <Link href="/search" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg transition-colors">
                        Add to Watchlist
                    </Link>
                </div>
            )}
        </section>
    )
}

export default WatchlistPage;
