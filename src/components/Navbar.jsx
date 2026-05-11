import { Link, useLocation } from "react-router-dom";

function Navbar() {

  const location =
    useLocation();

  const shopName =
    localStorage.getItem(
      "shopName"
    );

  const logout = () => {

    localStorage.removeItem(
      "shopName"
    );

    window.location.href =
      "/shoplogin";

  };

  // HIDE NAVBAR IN SHOP LOGIN

  const hideAdminMenu =

    location.pathname ===
    "/shoplogin";

  return (

    <nav className="navbar1">

      {/* SHOP LOGIN PAGE */}

      {

        hideAdminMenu ? (

          <>

            <Link to="/shoplogin">
              Shop Login
            </Link>

          </>

        ) : (

          <>

            {/* ADMIN MENU */}

            {

              !shopName && (

                <>

                  <Link to="/">
                    Home
                  </Link>

                  <Link to="/shop">
                    Add Shop
                  </Link>

                  <Link to="/mobile">
                    Add Mobile
                  </Link>

                  <Link to="/shoplist">
                    Shop List
                  </Link>

                  <Link to="/mobilelist">
                    Mobile List
                  </Link>

                  <Link to="/admin">
                    Create User
                  </Link>

                  <Link to="/shoplogin">
                    Shop Login
                  </Link>

                </>

              )

            }

            {/* SHOP PORTAL */}

            {

              shopName && (

                <>

                  <Link to="/">
                    Home
                  </Link>

                  <Link to="/shopmobiles">
                    My Mobiles
                  </Link>

                  <button
                    className="logout-btn"
                    onClick={logout}
                  >
                    Logout
                  </button>

                </>

              )

            }

          </>

        )

      }

    </nav>

  );
}

export default Navbar;