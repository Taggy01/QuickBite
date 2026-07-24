import Hero from "../components/hero";
import Navbar from "../components/Navbar";
import CardList from "../components/CardList";
import Types from "../components/Types";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import api from "../utils/axios.js";

function Homepage() {
    const [items, setItems] = useState([]);
    const [types, setTypes] = useState([]);
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [basket, setBasket] = useState([]);

    useEffect(() => {
        let mounted = true;

        const loadUser = async () => {
            try {
                const response = await api.get("/auth/me");
                if (mounted) {
                    setUser(response.data);
                }
            } catch (error) {
                console.log("Error in Fetching User : ", error);
                if (mounted) {
                    setUser(null);
                }
            }
        };

        void loadUser();

        return () => {
            mounted = false;
        };
    }, []);

    const getByTiming = (name) => {
        return items.filter(item => item.foodTime === name);
    }

    const fetchBasket = async () => {
        try {
            const response = await api.get("/basket");
            setBasket(response.data.items ?? []);
        } catch (error) {
            console.log("Error fetching basket:");
            console.log(error);
            console.log("Status:", error.response?.status);
            console.log("Message:", error.response?.data);
        }
    };

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const food = await api.get("/food");
                setItems(food.data);

                const category = await api.get("/category");
                setTypes(category.data);
                setLoading(false);
            } catch (error) {
                console.log("Error in Fetching Foods : ", error);
                setLoading(false);
            }
        };
        fetchFoods();
    }, []);

    useEffect(() => {
        if (user) {
            fetchBasket();
        }
    }, [user]);

    const addToBasket = async (_id) => {
        try {
            if (user) {
                const response = await api.post("/basket", { productId: _id, quantity: 1 });
                console.log("Item added to basket:", response.data);
                fetchBasket();
            }
        } catch (error) {
            console.log("Error in Card Component : ", error);
        }
    };

    const decreaseFromBasket = (productId) => {
        api.put("/basket", { productId })
            .then((response) => {
                console.log("Item quantity decreased in basket:", response.data);
                fetchBasket();
            })
            .catch((error) => {
                console.error("Error decreasing item quantity in basket:", error);
            });
    }

    const getQuantityinBasket = (_id) => {
        const item = basket.find(item => item.productId._id === _id || item.productId === _id);
        return item ? item.quantity : 0;
    }


    return (
        <>
            <Navbar user={user} setUser={setUser} addToBasket={addToBasket} basket={basket} fetchBasket={fetchBasket} decreaseFromBasket={decreaseFromBasket} />
            <div className="mx-30 mt-25">
                <Hero />
                <Types loading={loading} categories={types} />
                <CardList items={getByTiming("Breakfast")} loading={loading} head={"BreakFast"} addToBasket={addToBasket} decreaseFromBasket={decreaseFromBasket} getQuantity={getQuantityinBasket} />
                <CardList items={getByTiming("Lunch")} loading={loading} head={"Lunch"} addToBasket={addToBasket} decreaseFromBasket={decreaseFromBasket} getQuantity={getQuantityinBasket} />
                <CardList items={getByTiming("Snacks")} loading={loading} head={"Snacks"} addToBasket={addToBasket} decreaseFromBasket={decreaseFromBasket} getQuantity={getQuantityinBasket} />
                <CardList items={getByTiming("Dinner")} loading={loading} head={"Dinner"} addToBasket={addToBasket} decreaseFromBasket={decreaseFromBasket} getQuantity={getQuantityinBasket} />
            </div>
            <Footer />
        </>
    )
}

export default Homepage;