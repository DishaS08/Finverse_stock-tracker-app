
"use client";

import { useState } from "react";

type Stock = {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
};

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError("");
        setStocks([]);

        try {
            const response = await fetch(
                `/api/search?q=${encodeURIComponent(query.trim())}`
            );

            if (!response.ok) throw new Error("Search failed");

            const data = await response.json();
            setStocks(data.result ?? []);
        } catch {
            setError("Unable to search stocks. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-white">Search Stocks</h1>

            <form onSubmit={handleSearch} className="flex gap-3">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onInput={() => setError("")}
                    placeholder="Search company name or symbol..."
                    className="min-w-0 flex-1 rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-white"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-yellow-500 px-6 py-3 font-bold text-black disabled:opacity-50"
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {error && <p className="text-red-400">{error}</p>}

            {stocks.map((stock) => (
                <div
                    key={`${stock.symbol}-${stock.displaySymbol}`}
                    className="flex items-center justify-between gap-4 rounded-lg border border-gray-700 p-4 text-white"
                >
                    <div>
                        <p className="font-semibold">{stock.description}</p>
                        <p className="text-sm text-gray-400">
                            {stock.displaySymbol || stock.symbol}
                        </p>
                    </div>

                    <a
                        href={`/stocks/${encodeURIComponent(stock.symbol)}`}
                        className="rounded-lg border border-gray-600 px-4 py-2"
                    >
                        View Details
                    </a>
                </div>
            ))}
        </section>
    );
}
