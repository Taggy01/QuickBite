import React from "react";

function Categories({ image, name }) {

    const optimizeImage = (url) => {
        return url.replace("/upload/", "/upload/w_200,h_200,c_fill/");
    };

    return (
        <div className="card bg-base-100 w-30 cursor-pointer">
            <figure className="aspect-3/4 overflow-hidden">
                <img
                    src={optimizeImage(image)}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-lg"
                />
            </figure>
            <div className="card-body p-2 items-center">
                <h1 className="card-title font-geist font-light">{name}</h1>
            </div>
        </div>
    )
}

export default React.memo(Categories);