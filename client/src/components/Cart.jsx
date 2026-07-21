function CartItems() {
    return (
        <div className="drawer-side z-50 font-geist">
            <label
                htmlFor="cart-drawer"
                className="drawer-overlay"
            ></label>

            <div className="bg-base-200 w-100 min-h-full pt-4 flex flex-col">
                <h2 className="text-2xl mb-4 mx-4">My Cart</h2>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-4">
                    <p className="opacity-60">Your cart is empty</p>
                </div>

                {/* Footer */}
                <div className="bg-base-100 w-full p-4 rounded-lg">
                    <div className="btn btn-success w-full h-15 mt-4 flex items-center justify-between text-base-100">
                        <div className="flex flex-col">
                            <div className="text-left text-lg font-semibold">₹0</div>
                            <div className="text-left font-medium">Net Amount</div>
                        </div>
                        <div className="text-left font-semibold text-xl">Login to Proceed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems;