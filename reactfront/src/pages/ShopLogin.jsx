import { useState } from "react";
import axios from "axios";

function ShopLogin() {

  const [loginData, setLoginData] =
    useState({

      username: "",

      password: "",

    });

  const handleChange = (e) => {

    setLoginData({

      ...loginData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response =
        await axios.post(
          "https://pradheepsiva.onrender.com/api/user/login",
          loginData
        );

      localStorage.setItem(
        "shopName",
        response.data.data.shopName
      );

      alert("Login Success");

      window.location.href =
        "/shopmobiles";

    } catch (error) {

      alert("Invalid Login");

    }

  };

  return (

    <div className="newentry">

      <h2>
        Shop Login
      </h2>

      <form onSubmit={handleLogin}>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );
}

export default ShopLogin;