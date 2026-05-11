import { useState } from "react";

import axios from "axios";

function AdminCreateUser() {

  const [userData, setUserData] =
    useState({

      shopName: "",

      username: "",

      password: "",

    });

  const handleChange = (e) => {

    setUserData({

      ...userData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://pradheepsiva.onrender.com/api/user/create",
        userData
      );

      alert(
        "User Created Successfully"
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <section className="newentry">

      <h2>
        Create Shop User
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="shopName"
          placeholder="Shop Name"
          onChange={handleChange}
        />

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
          Create User
        </button>

      </form>

    </section>

  );
}

export default AdminCreateUser;