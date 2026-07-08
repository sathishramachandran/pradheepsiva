import { useState } from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";

function Navbar() {

  const location = useLocation();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const shopName =
    localStorage.getItem("shopName");

  const role =
    localStorage.getItem("role");

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {

    localStorage.clear();

    setMenuOpen(false);

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

        <Link
          to="/"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          📱 Pradheepsiva Mobiles
        </Link>

      </div>

      {/* HAMBURGER */}

      <div
        className="menu-icon"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >

        ☰

      </div>

      {/* MENU */}

      <div
        className={`nav-links ${
          menuOpen
            ? "active"
            : ""
        }`}
      >

        {/* ADMIN */}

        {

          (!shopName ||
            role === "admin") && (

            <>

              <Link
                to="/"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Home
              </Link>

              <Link
                to="/shop"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Add Shop
              </Link>

              <Link
                to="/mobile"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Add Mobile
              </Link>

              <Link
                to="/shoplist"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Shop List
              </Link>

              <Link
                to="/mobilelist"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Mobile List
              </Link>

              <Link
                to="/customer"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Customer Entry
              </Link>

            </>

          )

        }

        {/* SHOP */}
                {

          role === "shop" &&
          shopName && (

            <>

              <Link
                to="/"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Home
              </Link>

              <Link
                to="/shopmobiles"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
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

                👤 {shopName}

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