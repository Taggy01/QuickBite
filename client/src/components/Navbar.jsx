import { Search, ShoppingCart, ChevronDown } from "lucide-react";
import Login from "../components/login";
import TypeAnimation from "../utils/typeanimate";
import { useState } from "react";
import Signup from "./signup";
import CartItems from "./cart";

function Navbar() {
    const [view, setView] = useState("login");
    return (
        <nav className="navbar bg-base-100 shadow-sm px-10 h-20 fixed top-0 z-10">
            <div className="navbar-start">
                <a href="/" className="text-3xl font-geist"><span className="text-emerald-400">Quick</span><span className="text-emerald-500">Bite</span></a>
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
                    <div className="dropdown">
                        <div role="button" tabIndex={0} className="flex justify-center items-center gap-2 cursor-pointer">
                            <p className="text-xl text-base-content/80 join-item">Account</p>
                            <ChevronDown className="join-item w-4 h-4" />
                        </div>
                        <ul tabIndex={-1} className="dropdown-content menu bg-base-200 rounded-lg z-1 p-5 shadow-md font-geist">
                            <li className="text-lg font-bold text-base-content/60">My Account</li>
                            <li className="text-md font-medium text-base-content/40">randomEmail@gmail.com</li>
                            <li className="divider h-px bg-accent-content/50"></li>
                            <li><a  href="/orders">My Orders</a></li>
                            <li className="hover:bg-error rounded-sm hover:text-white"><a>Log Out</a></li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <a><button className="text-xl text-base-content/80 cursor-pointer" onClick={() => { setView("login"); document.getElementById('my_modal_2').showModal(); }}>Login</button></a>
                        <dialog id="my_modal_2" className="modal">
                            {view === "login" && <Login switchToSignup={() => setView("signup")} />}
                            {view === "signup" && <Signup switchToLogin={() => setView("login")} />}
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </>
                )}
                <div className="drawer drawer-end w-30 h-13 flex items-center gap-2 cursor-pointer">
                    <input id="cart-drawer" type="checkbox" className="drawer-toggle" />

                    {/* Button (trigger) */}
                    <div className="drawer-content">
                        <label
                            htmlFor="cart-drawer"
                            className="btn btn-soft btn-accent w-30 h-13 flex items-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span className="text-lg">Cart</span>
                        </label>
                    </div>

                    {/* Sidebar */}
                    <CartItems />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;