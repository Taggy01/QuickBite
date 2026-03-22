import Hero from "../components/hero";
import Navbar from "../components/Navbar";
import CardList from "../components/CardList";
import Types from "../components/Types";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

const breakfast = [
    {
        title: "Burger",
        source: "https://images.pexels.com/photos/36027860/pexels-photo-36027860.jpeg?_gl=1*1g03i2v*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTQwNTcwJGo1OSRsMCRoMA..",
        quantity: "30",
        price: "45",
        id: "1"
    },
    {
        title: "Fruit Salad",
        source: "https://images.pexels.com/photos/4736765/pexels-photo-4736765.jpeg?_gl=1*19lbmv7*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTQwNjMwJGo2MCRsMCRoMA..",
        quantity: "10",
        price: "97",
        id: "2"
    },
    {
        title: "Burger",
        source: "https://images.pexels.com/photos/36027860/pexels-photo-36027860.jpeg?_gl=1*1g03i2v*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTQwNTcwJGo1OSRsMCRoMA..",
        quantity: "30",
        price: "45",
        id: "3"
    },
    {
        title: "Fruit Salad",
        source: "https://images.pexels.com/photos/4736765/pexels-photo-4736765.jpeg?_gl=1*19lbmv7*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTQwNjMwJGo2MCRsMCRoMA..",
        quantity: "10",
        price: "97",
        id: "4"
    },
    {
        title: "Burger",
        source: "https://images.pexels.com/photos/36027860/pexels-photo-36027860.jpeg?_gl=1*1g03i2v*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTQwNTcwJGo1OSRsMCRoMA..",
        quantity: "30",
        price: "45",
        id: "5"
    },
    {
        title: "Fruit Salad",
        source: "https://images.pexels.com/photos/4736765/pexels-photo-4736765.jpeg?_gl=1*19lbmv7*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTQwNjMwJGo2MCRsMCRoMA..",
        quantity: "10",
        price: "97",
        id: "6"
    },
    {
        title: "Burger",
        source: "https://images.pexels.com/photos/36027860/pexels-photo-36027860.jpeg?_gl=1*1g03i2v*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTQwNTcwJGo1OSRsMCRoMA..",
        quantity: "30",
        price: "45",
        id: "7"
    },
    {
        title: "Fruit Salad",
        source: "https://images.pexels.com/photos/4736765/pexels-photo-4736765.jpeg?_gl=1*19lbmv7*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTQwNjMwJGo2MCRsMCRoMA..",
        quantity: "10",
        price: "97",
        id: "8"
    },

]

const type = [
    {
        title: "Rice",
        source: "https://images.pexels.com/photos/8994586/pexels-photo-8994586.jpeg?_gl=1*1u8p8lg*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTQwMjYyJGo1NiRsMCRoMA..",
        id: "1"
    },
    {
        title: "Fast Food",
        source: "https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?_gl=1*y0yne8*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTQwMTczJGo1OCRsMCRoMA..",
        id: "2"
    },
    {
        title: "Non Veg",
        source: "https://images.pexels.com/photos/7353379/pexels-photo-7353379.jpeg?_gl=1*1u8p8lg*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTQwMjYyJGo1NiRsMCRoMA..",
        id: "3"
    },
    {
        title: "Drinks",
        source: "https://images.pexels.com/photos/36643280/pexels-photo-36643280.jpeg?_gl=1*1rf8bbj*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTQwMzI5JGo1OCRsMCRoMA..",
        id: "4"
    },
    {
        title: "MilkShakes",
        source: "https://images.pexels.com/photos/6463659/pexels-photo-6463659.jpeg?_gl=1*3trfml*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTM5ODc0JGozMSRsMCRoMA..",
        id: "5"
    },
    {
        title: "Pies",
        source: "https://images.pexels.com/photos/6163264/pexels-photo-6163264.jpeg?_gl=1*1s9sv32*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTQwMTExJGo0MyRsMCRoMA..",
        id: "6"
    },
    {
        title: "Rolls",
        source: "https://images.pexels.com/photos/4001867/pexels-photo-4001867.jpeg?_gl=1*1lhntn3*_ga*NDk4NjgyNzc0LjE3NTQ1NzExMTY.*_ga_8JE65Q40S6*czE3NzQxMzk4NDUkbzE3JGcxJHQxNzc0MTQwMTM2JGoxOCRsMCRoMA..",
        id: "7"
    }
]

function Homepage() {
    const [items, setItems] = useState([]);
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // simulate API delay
        setTimeout(() => {
            setItems(breakfast);
            setTypes(type);
            setLoading(false);
        }, 2500); // 1.5 sec delay
    }, []);
    return (
        <>
            <Navbar />
            <div className="mx-30 mt-25">
                <Hero />
                <Types loading={loading} categories={types} />
                <CardList items={items} loading={loading} head={"BreakFast"} />
                <CardList items={items} loading={loading} head={"Lunch"} />
                <CardList items={items} loading={loading} head={"Snacks"} />
                <CardList items={items} loading={loading} head={"Dinner"} />
            </div>
            <Footer />
        </>
    )
}

export default Homepage;