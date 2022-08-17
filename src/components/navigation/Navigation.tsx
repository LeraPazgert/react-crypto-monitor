import { Link } from "react-router-dom";
import './Navigation.scss';

const Navigation = () => {
    return (
        <nav className="navigation">
            <div className="container">
                <div className="navigation__wrapper">
                <Link className="navigation__title" to="/">Crypto Monitor</Link>
                <Link  to="/">
                    <img 
                    className="navigation__briefcase"
                    src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/000000/external-briefcase-startup-business-xnimrodx-lineal-color-xnimrodx.png"
                    alt='briefcase'/>
                </Link>
                </div>
            </div>

        </nav>
    );
};

export default Navigation;