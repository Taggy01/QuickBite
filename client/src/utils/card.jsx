import React from "react";

function Card({ foodImage, name, quantity, price, _id, addToBasket, getQuantity, decreaseFromBasket }) {

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
            <div className="card-body p-2">
                <h1 className="card-title">{name}</h1>
                <p className="text-secondary-content/50 font-geist">Quantity : {quantity}</p>
                <div className="card-actions items-center pt-2 flex justify-center">
                    <p className="font-geist font-medium">₹ {price}</p>
                        {getQuantity(_id) > 0 ?
                            <div className="flex items-center justify-center gap-4 btn btn-md btn-soft btn-primary cursor-auto">
                                <span className="text-lg cursor-pointer" onClick={() => {
                                    addToBasket(_id);
                                }}>
                                    +
                                </span>
                                <span className="text-lg">{getQuantity(_id)}</span>
                                <span className="text-lg cursor-pointer" onClick={() => {
                                    decreaseFromBasket(_id);
                                }}>
                                    -
                                </span>
                            </div>
                            : <button className="btn btn-soft btn-primary" onClick={() => {
                                addToBasket(_id);
                            }}>
                                Add
                            </button>
                        }
                </div>
            </div>
        </div>
    )
}

export default React.memo(Card);