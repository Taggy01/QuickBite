import { Search, ShoppingCart, ChevronDown } from "lucide-react";
import TypeAnimation from "../utils/typeanimate";

function Navbar() {
    return (
        <nav className="navbar bg-base-100 shadow-sm px-10 h-20 fixed top-0 z-10">
            <div className="navbar-start">
                <a className="text-3xl font-bold"><span className="text-green-400">Quick</span><span className="text-green-700">Bite</span></a>
            </div>
            <div className="navbar-center">
                <a className="flex cursor-text border border-neutral-content rounded-lg bg-neutral-content/40 h-13 w-100 px-4" href="/search">
                    <div className="flex justify-center items-center gap-2">
                        <Search className="w-5 h-5 text-base-content/70" />
                        <TypeAnimation />
                    </div>
                </a>
            </div>
            <div className="navbar-end gap-10">
                {true ? (
                    <div className="flex justify-center items-center gap-2 cursor-pointer">
                    <p className="text-xl text-base-content/80 join-item">Account</p>
                    <ChevronDown className="join-item w-4 h-4" />
                    </div>
                ) : (
                    <a href="/login" className="text-xl text-base-content/80">Login</a>
                )}
                <div className=" btn btn-soft btn-success w-30 h-13 items-center gap-2">
                    <ShoppingCart className="join-item w-5 h-5" />
                    <button className="text-lg join-item">Cart</button>
                </div>
            </div>
        </nav   >
    )
}

export default Navbar;