function Card({ source, title, quantity, price }) {
    return (
        <div className="card bg-base-100 w-50 border border-neutral-content shadow-lg px-4">
            <figure className="aspect-square overflow-hidden pt-4">
                <img
                    src={source}
                    alt={title}
                    className="w-full h-full object-cover rounded-lg"
                />
            </figure>
            <div className="card-body p-4">
                <h1 className="card-title">{title}</h1>
                <p className="text-accent-content/50 font-geist">Quantity - {quantity}</p>
                <div className="card-actions items-center pt-4">
                    <p className="font-geist font-medium">₹ {price}</p>
                    <button className="btn btn-soft btn-accent">Add</button>
                </div>
            </div>
        </div>
    )
}

export default Card;