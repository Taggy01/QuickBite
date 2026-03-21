function Hero() {
    return (
        <div className="hero relative bg-[url('/pexel.jpg')] bg-cover bg-center aspect-[2.35/1] rounded-lg">
            <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
            <div className="hero-content text-center">
                <div className="text-white">
                    <h1 className="font-instrument text-7xl">
                        Get A Quick Meal Just At Your Fingertips
                    </h1>
                    <p className="font-geist text-2xl pt-3">Just at QuickBite</p>
                </div>
            </div>
        </div>
    )
}

export default Hero;