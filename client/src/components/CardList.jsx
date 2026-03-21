import Card from "../utils/card";

const items = [
    { title: "Fast Food", source: "/fast-food.jpg", quantity: "30", price: "45" }
]

function CardList() {
    return (
        <div className="mt-20">
            <h1 className="font-instrument mb-5 text-4xl font-medium">BreakFast</h1>
            <div className="carousel rounded-box">
                <div className="carousel-item">
                    {
                        items.map((item) => (
                            <Card
                                title={item.title}
                                source={item.source}
                                quantity={item.quantity}
                                price={item.price}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CardList;