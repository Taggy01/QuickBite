function Categories({ source, title }) {
    return (
        <div className="card bg-base-100 w-30 cursor-pointer">
            <figure className="aspect-3/4 overflow-hidden">
                <img
                    src={source}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-lg"
                />
            </figure>
            <div className="card-body p-2 items-center">
                <h1 className="card-title font-geist font-light">{title}</h1>
            </div>
        </div>
    )
}

export default Categories;