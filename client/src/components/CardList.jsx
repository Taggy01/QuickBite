import Card from "../utils/card";
import CardSkeleton from "../utils/cardSkeleton";

function CardList({ items = [], head, loading }) {
    return (
        <div className="mt-20">
            <h1 className="font-instrument mb-5 text-4xl font-medium">{head}</h1>
                <div className="carousel grid grid-cols-6 space-x-4">
                    {loading 
                        ? Array(6).fill(0).map((_, i) => (
                                <div className="carousel-item">
                                    <CardSkeleton />
                                </div>
                            )
                        )
                        
                        : items.slice(0,6).map((item) => (
                                <div key={item.id} className="carousel-item">
                                    <Card {...item} />
                                </div>
                            )
                        )
                    }
                </div>
        </div>
    )
}

export default CardList;