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
    const [loading, setLoading] = useState(true);

    const getByTiming = (name) => {
        return items.filter(item => item.foodTime === name);
    }

    useEffect(() => {
        const fetchFoods = async() => {
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
    return (
        <>
            <Navbar />
            <div className="mx-30 mt-25">
                <Hero />
                <Types loading={loading} categories={types} />
                <CardList items={getByTiming("Breakfast")} loading={loading} head={"BreakFast"} />
                <CardList items={getByTiming("Lunch")} loading={loading} head={"Lunch"} />
                <CardList items={getByTiming("Snacks")} loading={loading} head={"Snacks"} />
                <CardList items={getByTiming("Dinner")} loading={loading} head={"Dinner"} />
            </div>
            <Footer />
        </>
    )
}

export default Homepage;