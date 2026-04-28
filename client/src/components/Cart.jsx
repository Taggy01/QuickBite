function CartItems() {
    return (
        <div className="drawer-side z-50">
            <label
                htmlFor="cart-drawer"
                className="drawer-overlay"
            ></label>

            <div className="bg-base-200 w-80 min-h-full p-4 flex flex-col">
                <h2 className="text-xl font-bold mb-4">My Cart 🛒</h2>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto">
                    <p className="opacity-60">Your cart is empty</p>
                </div>

                {/* Footer */}
                <div className="border-t pt-4">
                    <div className="flex justify-between font-bold mb-3">
                        <span>Total</span>
                        <span>₹0</span>
                    </div>
                    <button className="btn btn-success w-full">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItems;