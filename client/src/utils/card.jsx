import React from "react";

function Card({ foodImage, name, quantity, price }) {

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
                <p className="text-accent-content/50 font-geist">Quantity : {quantity}</p>
                <div className="card-actions items-center pt-4">
                    <p className="font-geist font-medium">₹ {price}</p>
                    <button className="btn btn-soft btn-primary">Add</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Card);