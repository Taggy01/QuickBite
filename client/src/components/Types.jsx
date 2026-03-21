import Categories from "../utils/categories";

const items = [
    {title: "Rice", source: "/rice.jpg"},
    {title: "Fast Food", source: "/fast-food.jpg"},
    {title: "Non Veg", source: "/non-veg.jpg"},
    {title: "Drinks", source: "/drink.jpg"},
    {title: "Milk Shakes", source: "/milkshake.jpg"},
    {title: "Pies", source: "/pie.jpg"},
    {title: "Rolls", source: "/roll.jpg"}
]

function Types() {
    return(
        <div className="mt-20 p-4 gap-4 grid grid-cols-7 place-items-center">
            {
                items.map((item, index) => (
                    <Categories 
                    title={item.title}
                    source={item.source}
                    />
                ))
            }
        </div>
    )
}

export default Types;