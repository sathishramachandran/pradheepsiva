import {
  Link,
  useLocation,
} from "react-router-dom";

function Navbar() {

  const location =
    useLocation();

  const shopName =
    localStorage.getItem(
      "shopName"
    );

  const role =
    localStorage.getItem(
      "role"
    );

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {

    localStorage.clear();

    window.location.href =
      "/shoplogin";

  };

  /* =========================
     HIDE NAVBAR
  ========================= */

  const hideNavbar =

    location.pathname ===
    "/shoplogin";

  if (hideNavbar) {

    return null;

  }

  /* =========================
     UI
  ========================= */

  return (

    <nav className="navbar1">

      {/* LOGO */}

      <div className="nav-logo">

        <Link to="/">
          Pradheepsiva Mobiles
        </Link>

      </div>

      {/* MENU */}

      <div className="nav-links">

        {/* ADMIN */}

        {

          (!shopName ||
            role === "admin") && (

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

            </>

          )

        }

        {/* SHOP */}

        {

          role === "shop" &&
            shopName && (

              <>

                <Link to="/">
                  Home
                </Link>

                <Link to="/shopmobiles">
                  My Mobiles
                </Link>

              </>

            )

        }

      </div>

      {/* RIGHT */}

      <div className="nav-right">

        {

          shopName ? (

            <>

              <span className="shop-user">

                {shopName}

              </span>

              <button
                className="logout-btn"
                onClick={logout}
              >

                Logout

              </button>

            </>

          ) : (

            <Link
              to="/shoplogin"
              className="login-link"
            >

              Shop Login

            </Link>

          )

        }

      </div>

    </nav>

  );
}

export default Navbar;