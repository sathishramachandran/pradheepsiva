import { useState } from "react";
import axios from "axios";

function AdminCreateUser() {

  const [userData, setUserData] =
    useState({

      shopName: "",

      username: "",

      password: "",

      role: "shop",

    });

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {

    setUserData({

      ...userData,

      [e.target.name]:
        e.target.value,

    });

  };

  /* =========================
     HANDLE SUBMIT
  ========================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {

      const response =
        await axios.post(
          "https://pradheepsiva.onrender.com/api/user/create",
          userData
        );

      setMessage(
        response.data.message
      );

      alert(
        "User Created Successfully"
      );

      setUserData({

        shopName: "",

        username: "",

        password: "",

        role: "shop",

      });

    } catch (error) {

      console.log(error);

      setMessage(
        error.response?.data
          ?.message ||
          "Something Went Wrong"
      );

      alert(
        error.response?.data
          ?.message ||
          "Failed To Create User"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="newentry">

      <div className="form-container">

        <h2 className="form-title">
          Create Shop User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="user-form"
        >

          {/* SHOP NAME */}

          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            value={
              userData.shopName
            }
            onChange={handleChange}
            required
          />

          {/* USERNAME */}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={
              userData.username
            }
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              userData.password
            }
            onChange={handleChange}
            required
          />

          {/* ROLE */}

          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
          >

            <option value="shop">
              Shop
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Creating..."
              : "Create User"}

          </button>

        </form>

        {/* MESSAGE */}

        {message && (

          <p className="message">

            {message}

          </p>

        )}

      </div>

    </section>

  );
}

export default AdminCreateUser;