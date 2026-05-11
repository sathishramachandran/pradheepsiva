import { useState } from "react";

import axios from "axios";

function ShopForm() {

  const [loading, setLoading] =
    useState(false);

  const [shopData, setShopData] =
    useState({

      shopName: "",

      ownerName: "",

      mobileNumber: "",

      address: "",

    });

  const handleChange = (e) => {

    setShopData({

      ...shopData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await axios.post(
        "https://pradheepsiva.onrender.com/api/shop/add",
        shopData
      );

      alert(
        "Shop Added Successfully"
      );

      window.location.href =
        "/mobile";

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="newentry">

      <h2>
        Add Shop
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
          name="ownerName"
          placeholder="Owner Name"
          onChange={handleChange}
        />

        <input
          type="number"
          name="mobileNumber"
          placeholder="Mobile Number"
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <button type="submit">

          {

            loading

              ? "Submitting..."

              : "Add Shop"

          }

        </button>

      </form>

    </section>

  );
}

export default ShopForm;