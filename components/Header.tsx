import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";

const Header = async ({ user }: { user: User }) => {
    const initialStocks = await searchStocks();

    return (
        <header className="sticky top-0 z-50 w-full h-[70px] bg-gray-800 border-b border-gray-700">
            <div className="container h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center shrink-0">
                    <Image
                        src="/assets/icons/logo.svg"
                        alt="Finverse logo"
                        width={180}
                        height={50}
                        className="cursor-pointer"
                    />
                </Link>

                {/* Nav Items - Hidden on mobile */}
                <nav className="hidden sm:flex items-center">
                    <NavItems initialStocks={initialStocks} />
                </nav>

                {/* User Dropdown */}
                <div className="flex items-center">
                    <UserDropdown user={user} initialStocks={initialStocks} />
                </div>
            </div>
        </header>
    )
}

export default Header
