import {Link} from "react-router-dom";

function GetStarted() {
    return (
        <main>
            <h1>
                Get Started
            </h1>
            <p>Choose how you want to continue.</p>
            <Link to="/login">I already have an account</Link>
            <Link to="/register">I'm a new user</Link>
        </main>
    );
}

export default GetStarted;