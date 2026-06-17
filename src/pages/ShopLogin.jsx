import { useState } from "react";

import axios from "axios";

function ShopLogin() {

  /* =========================
     STATE
  ========================= */

  const [loginData, setLoginData] =
    useState({

      username: "",

      password: "",

    });

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

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
     LOGIN
  ========================= */

  const handleLogin = async (e) => {

    e.preventDefault();

    /* VALIDATION */

    if (
      !loginData.username ||
      !loginData.password
    ) {

      return setMessage(
        "Please Fill All Fields"
      );

    }

    setLoading(true);

    setMessage("");

    try {

      const response =
        await axios.post(

          "https://pradheepsiva.onrender.com/api/user/login",

          loginData

        );

      /* SAVE DATA */

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

      setMessage(
        "Login Successful"
      );

      /* REDIRECT */

      setTimeout(() => {

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

      }, 1000);

    } catch (error) {

      console.log(error);

      setMessage(
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

        {/* TOP */}

        <div className="login-top">

          <h1>
            📱
          </h1>

          <h2 className="login-title">

            Pradheepsiva Mobiles

          </h2>

          <p>
            Shop Portal Login
          </p>

        </div>

        {/* FORM */}

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

          <div className="password-box">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Enter Password"
              value={
                loginData.password
              }
              onChange={handleChange}
              required
            />

            <span
              className="show-btn"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >

              {

                showPassword

                  ? "🙈"

                  : "👁️"

              }

            </span>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >

            {

              loading

                ? "Logging In..."

                : "Login"

            }

          </button>

        </form>

        {/* MESSAGE */}

        {

          message && (

            <p className="login-message">

              {message}

            </p>

          )

        }

      </div>

    </section>

  );
}

export default ShopLogin;