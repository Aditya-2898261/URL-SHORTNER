import {Link} from "react-router-dom";

function Hero() {
    return (
        <main>
            <h1>Shorten your URLs</h1>
            <p>
                Turn long URLs into simple, shareable links.
            </p>
            <Link to="/get-started">
                Get Started
            </Link>
        </main>
    );
}

export default Hero;