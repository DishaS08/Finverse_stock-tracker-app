
import Link from 'next/link';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import WatchlistButton from '@/components/WatchlistButton';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WatchlistCard = ({ stock }: { stock: any }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-base font-bold text-white">{stock.symbol}</h3>
                    <p className="text-gray-400 text-xs overflow-hidden text-ellipsis whitespace-nowrap max-w-[160px]">{stock.company}</p>
                </div>
                <WatchlistButton
                    symbol={stock.symbol}
                    company={stock.company}
                    initialIsWatchlisted={true}
                    type="icon"
                />
            </div>

            <div className="flex justify-between items-end">
                <div>
                    <p className="text-lg font-bold text-white">
                        {stock.price ? formatCurrency(stock.price) : 'N/A'}
                    </p>
                    {stock.change && (
                        <p className={`text-xs ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.change >= 0 ? '+' : ''}{formatPercentage(stock.change)}
                        </p>
                    )}
                </div>

                <Link href={`/stocks/${stock.symbol}`} className="text-yellow-500 hover:text-yellow-400 text-xs font-medium">
                    View Details
                </Link>
            </div>
        </div>
    )
}

export default WatchlistCard;
