import Hero from "../components/hero";
import Navbar from "../components/Navbar";
import CardList from "../components/CardList"; 
import Types from "../components/Types";

function Homepage() {
    return (
        <>
            <Navbar />
            <div className="mx-30 mt-25">
                <Hero />
                <Types />
                <CardList />
            </div>
        </>
    )
}

export default Homepage;