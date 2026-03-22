function Footer() {
    return (
        <div className="bg-base-200 text-base-content">
            <footer className="footer footer-horizontal py-10 px-20 mt-20 font-geist">
                <nav>
                    <h6 className="footer-title">Categories</h6>
                    <a className="link link-hover">Drinks</a>
                    <a className="link link-hover">Rice</a>
                    <a className="link link-hover">Non-Veg</a>
                    <a className="link link-hover">Rolls</a>
                    <a className="link link-hover">Fast Food</a>
                    <a className="link link-hover">MilkShakes</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Food Timing</h6>
                    <a className="link link-hover">Breakfast</a>
                    <a className="link link-hover">Lunch</a>
                    <a className="link link-hover">Snacks</a>
                    <a className="link link-hover">Dinner</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About</a>
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">Blog</a>
                </nav>
            </footer>
            <aside className="py-5 text-center">
                <p>Copyright © {new Date().getFullYear()} - All right reserved by QuickBite</p>
            </aside>
        </div>
    )
}

export default Footer;