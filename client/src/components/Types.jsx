import Categories from "../utils/categories";

function Types({categories = [], loading }) {
    return (
        <div className="mt-20 p-4 gap-4 grid grid-cols-7 place-items-center">
            {loading
                ? Array(7).fill(0).map((_, i) => (
                    <div id={i} className="skeleton h-30 w-3/4"></div>
                ))

                : categories.map((category) => (
                    <Categories
                        key={category._id}
                        name={category.name}
                        image={category.image}
                    />
                ))
            }
        </div>
    )
}

export default Types;