import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar1">

      <Link to="/">
        Home
      </Link>

      <Link to="/shoplist">
        Show Shop List
      </Link>

      <Link to="/shop">
        Enter New Shop
      </Link>

      <Link to="/mobilelist">
        Show Mobiles List
      </Link>

      <Link to="/mobile">
        Enter New Mobile
      </Link>

    </nav>
  );
}

export default Navbar;