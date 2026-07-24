import { useMemo } from "react";
import api from "../utils/axios.js";

function BasketItems({ user, basket,addToBasket,fetchBasket,decreaseFromBasket }) {

    const removeFromBasket = (productId) => {
        api.delete("/basket", { data: { productId } })
            .then((response) => {
                console.log("Item removed from basket:", response.data);
                fetchBasket();
            })
            .catch((error) => {
                console.error("Error removing item from basket:", error);
            });
    }

    const isLoggedIn = !!user;
    const subtotal = useMemo(() => {
        const subtotal = basket.reduce(
            (total, item) => total + item.productId.price * item.quantity,
            0
        );
        return subtotal;
    }, [basket]);
    const tax = subtotal * 0.05;
    const delivery = 20;
    const total = subtotal + tax + delivery;

    return (
        <div className="drawer-side fixed inset-0 z-50 font-geist">
            <label
                htmlFor="cart-drawer"
                className="drawer-overlay"
            ></label>

            <div className="bg-blue-50 w-100 max-w-full h-screen flex flex-col ml-auto">
                {/* Header */}
                <div className="font-instrument p-5 bg-base-100 rounded-b-2xl rounded-t-none">
                    <h2 className="text-3xl">My Basket</h2>
                </div>

                {/* Basket Items */}
                <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar px-4 py-3">
                    <div className="bg-base-100 rounded-2xl shadow p-2 space-y-2">
                        {!basket.length && (
                            <div className="flex justify-center items-center h-40">
                                <span className="text-base-content/60">Your basket is empty</span>
                            </div>
                        )}
                        {
                        basket.map(({ _id, productId, quantity }) => (
                            <div className="flex gap-4 justify-between p-2" key={_id}>
                                <img src={productId.foodImage} alt={productId.name} className="aspect-3/4 h-15 rounded object-cover" />
                                <div className="flex items-center justify-start flex-1">
                                    <div>
                                        <h3 className="text-sm">{productId.name}</h3>
                                        <p className="text-base-content/60 text-sm">₹{productId.price.toFixed(2)}</p>
                                        <a href="#" className="text-sm text-error hover:underline" onClick={(e) => {
                                            e.preventDefault();
                                            removeFromBasket(productId._id);
                                        }}>
                                            Remove
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="btn btn-square btn-primary text-lg btn-xs" onClick={() => {
                                        decreaseFromBasket(productId._id);
                                    }}>
                                        -
                                    </button>
                                    <span>{quantity}</span>
                                    <button className="btn btn-square btn-primary text-lg btn-xs" onClick={() => {
                                        addToBasket(productId._id);
                                    }}>
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Tax Summary */}
                    <div className="space-y-2 mt-4 bg-base-100 rounded-2xl shadow p-4 w-full">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>GST (5%)</span>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>₹{delivery.toFixed(2)}</span>
                        </div>

                        <div className="divider my-1"></div>

                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>


                {/* Footer */}
                <div
                    className={`btn w-full h-20 mt-4 flex items-center rounded-t-2xl rounded-b-none justify-between ${isLoggedIn && basket.length > 0
                        ? "btn-success text-base-100"
                        : "btn-base-100 text-base-content/40 cursor-not-allowed"
                        }`}
                >
                    <div className="flex flex-col">
                        <div className="text-left text-lg font-semibold">
                            ₹{total.toFixed(2)}
                        </div>
                        <div className="text-left font-medium">
                            Net Amount
                        </div>
                    </div>

                    <div className="text-xl font-semibold">
                        {isLoggedIn ? "Checkout" : "Login to Proceed"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasketItems;