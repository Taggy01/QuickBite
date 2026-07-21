import { Search, ShoppingCart, ChevronDown } from "lucide-react";
import Login from "../components/login";
import TypeAnimation from "../utils/typeanimate";
import { useEffect, useState } from "react";
import Signup from "./signup";
import CartItems from "./cart";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const [view, setView] = useState("login");
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        const loadUser = async () => {
            try {
                const response = await api.get("/auth/me");
                if (mounted) {
                    setUser(response.data);
                }
            } catch (error) {
                console.log("Error in Fetching User : ", error);
                if (mounted) {
                    setUser(null);
                }
            }
        };

        void loadUser();

        return () => {
            mounted = false;
        };
    }, []);

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            setUser(null);
            navigate("/");
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    if (user === undefined) {
        return (
            <div className="flex justify-center items-center h-20">
                <span className="loading loading-spinner loading-md"></span>
            </div>
        );
    }

    return (
        <nav className="navbar bg-base-100 shadow-sm px-10 h-20 fixed top-0 z-10">
            <div className="navbar-start">
                <a href="/" className="text-3xl font-geist"><span className="text-lime-600 font-semibold">Pick-it</span><span className="text-amber-400 font-semibold">Up</span></a>
            </div>
            <div className="navbar-center">
                <div className="flex cursor-text border border-neutral-content rounded-lg bg-neutral-content/40 h-13 w-100 px-4" onClick={() => navigate("/search")}>
                    <div className="flex justify-center items-center gap-2">
                        <Search className="w-5 h-5 text-base-content/70" />
                        <TypeAnimation />
                    </div>
                </div>
            </div>
            <div className="navbar-end gap-10">
                {user ? (
                    <div className="dropdown">
                        <div role="button" tabIndex={0} className="flex justify-center items-center gap-2 cursor-pointer">
                            <p className="text-xl text-base-content/80 join-item">Account</p>
                            <ChevronDown className="join-item w-4 h-4" />
                        </div>
                        <ul tabIndex={-1} className="dropdown-content menu bg-base-200 rounded-lg z-1 p-5 shadow-md font-geist">
                            <li className="text-lg font-bold text-base-content/60">
                                {user?.username
                                    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
                                    : ""}
                            </li>
                            <li className="text-md font-medium text-base-content/40">{user?.email}</li>
                            <li className="divider h-px bg-accent-content/50"></li>
                            <li><a href="/orders">My Orders</a></li>
                            <li>
                                <button onClick={handleLogout} className="hover:bg-error rounded-sm hover:text-white">Log Out</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <a><button className="text-xl text-base-content/80 cursor-pointer" onClick={() => { setView("login"); document.getElementById('my_modal_2').showModal(); }}>Login</button></a>
                        <dialog id="my_modal_2" className="modal">
                            {view === "login" && <Login switchToSignup={() => setView("signup")} onLoginSuccess={setUser} />}
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