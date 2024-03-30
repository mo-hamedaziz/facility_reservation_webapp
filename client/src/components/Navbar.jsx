import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul className="navbar">
                <li className="navbar-item"><a href="/">Home</a></li>
                <li className="navbar-item"><a href="/about">About</a></li>
                <li className="navbar-item"><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;