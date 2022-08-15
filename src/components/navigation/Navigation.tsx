import { Link } from "react-router-dom";
import './Navigation.scss';

const Navigation = () => {
    return (
        <nav className="navigation">
            <div className="container">
                <Link className="navigation__main-link" to="/">Crypto Monitor</Link>
            </div>

        </nav>
    );
};

export default Navigation;