import { Link } from "react-router-dom";
const Navbar = () => {
    return (<nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/sales">Sales</Link></li>
            <li><Link to="/auction">Pooling Auction</Link></li>
            <li><Link to="/suppliers">Suppliers</Link></li>
        </ul>
    </nav>)
}

export default Navbar