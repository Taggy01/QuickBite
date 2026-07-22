import React from "react";
import api from "../utils/axios";

function Card({ foodImage, name, quantity, price, _id, user }) {

    const addToBasket = async () => {
        try {
            if(user){
                const response = await api.post("/basket", { productId: _id, quantity: 1 });
                console.log("Item added to basket:", response.data);
            }
        } catch (error) {
            console.log("Error in Card Component : ", error);
        }
    };

    const optimizeImage = (url) => {
        return url.replace("/upload/", "/upload/w_200,h_200,c_fill/");
    };

    return (
        <div className="card bg-base-100 w-50 border border-neutral-content px-4">
            <figure className="aspect-square overflow-hidden pt-4">
                <img
                    src={optimizeImage(foodImage)}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-lg"
                />
            </figure>
            <div className="card-body p-4">
                <h1 className="card-title">{name}</h1>
                <p className="text-secondary-content/50 font-geist">Quantity : {quantity}</p>
                <div className="card-actions items-center pt-4">
                    <p className="font-geist font-medium">₹ {price}</p>
                    <button className="btn btn-soft btn-primary" onClick={() => {
                        addToBasket();
                    }}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Card);