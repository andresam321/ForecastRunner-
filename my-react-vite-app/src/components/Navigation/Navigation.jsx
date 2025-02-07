import { NavLink } from "react-router-dom";


function Navigation() {

    return (
        <nav className="">
            <ul>
                <h2>My Navigation Top Bar</h2>
                <li>
                    <NavLink to="/" className="">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/Weather" className="">Weather Cast</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;