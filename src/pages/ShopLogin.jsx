import { useState } from "react";
import axios from "axios";

function ShopLogin() {

  const [loginData, setLoginData] =
    useState({

      username: "",

      password: "",

    });

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {

    setLoginData({

      ...loginData,

      [e.target.name]:
        e.target.value,

    });

  };

  /* =========================
     HANDLE LOGIN
  ========================= */

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {

      const response =
        await axios.post(
          "https://pradheepsiva.onrender.com/api/user/login",
          loginData
        );

      /* =========================
         SAVE USER DATA
      ========================= */

      localStorage.setItem(
        "shopName",
        response.data.data.shopName
      );

      localStorage.setItem(
        "role",
        response.data.data.role
      );

      localStorage.setItem(
        "username",
        response.data.data.username
      );

      alert("Login Success");

      setMessage(
        "Login Successful"
      );

      /* =========================
         REDIRECT
      ========================= */

      if (
        response.data.data.role ===
        "admin"
      ) {

        window.location.href =
          "/";

      } else {

        window.location.href =
          "/shopmobiles";

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Invalid Username Or Password"
      );

      alert(
        "Invalid Username Or Password"
      );

    } finally {

      setLoading(false);

    }

  };

  /* =========================
     UI
  ========================= */

  return (

    <section className="login-page">

      <div className="login-container">

        <h2 className="login-title">

          Shop Login

        </h2>

        <form
          onSubmit={handleLogin}
          className="login-form"
        >

          {/* USERNAME */}

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={
              loginData.username
            }
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={
              loginData.password
            }
            onChange={handleChange}
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Logging In..."
              : "Login"}

          </button>

        </form>

        {/* MESSAGE */}

        {message && (

          <p className="login-message">

            {message}

          </p>

        )}

      </div>

    </section>

  );
}

export default ShopLogin;