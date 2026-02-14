import WatchlistCard from "@/components/WatchlistCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WatchlistGrid = ({ watchlist }: { watchlist: any[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {watchlist.map((stock) => (
                <WatchlistCard key={stock.symbol} stock={stock} />
            ))}
        </div>
    )
}

export default WatchlistGrid;
