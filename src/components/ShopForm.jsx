import { useState } from "react";
import axios from "axios";

function ShopForm() {

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [shopData, setShopData] =
    useState({

      shopName: "",

      ownerName: "",

      mobileNumber: "",

      address: "",

    });

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {

    setShopData({

      ...shopData,

      [e.target.name]:
        e.target.value,

    });

  };

  /* =========================
     HANDLE SUBMIT
  ========================= */

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {

      await axios.post(
        "https://pradheepsiva.onrender.com/api/shop/add",
        shopData
      );

      alert(
        "Shop Added Successfully"
      );

      setMessage(
        "Shop Added Successfully"
      );

      /* RESET FORM */

      setShopData({

        shopName: "",

        ownerName: "",

        mobileNumber: "",

        address: "",

      });

      /* REDIRECT */

      setTimeout(() => {

        window.location.href =
          "/mobile";

      }, 1000);

    } catch (error) {

      console.log(error);

      setMessage(
        "Failed To Add Shop"
      );

      alert(
        "Failed To Add Shop"
      );

    } finally {

      setLoading(false);

    }

  };

  /* =========================
     UI
  ========================= */

  return (

    <section className="shop-form-page">

      <div className="shop-form-container">

        <h2 className="form-title">

          Add Shop

        </h2>

        <form
          onSubmit={handleSubmit}
          className="shop-form"
        >

          {/* SHOP NAME */}

          <input
            type="text"
            name="shopName"
            placeholder="Enter Shop Name"
            value={
              shopData.shopName
            }
            onChange={handleChange}
            required
          />

          {/* OWNER NAME */}

          <input
            type="text"
            name="ownerName"
            placeholder="Enter Owner Name"
            value={
              shopData.ownerName
            }
            onChange={handleChange}
            required
          />

          {/* MOBILE NUMBER */}

          <input
            type="tel"
            name="mobileNumber"
            placeholder="Enter Mobile Number"
            value={
              shopData.mobileNumber
            }
            onChange={handleChange}
            required
          />

          {/* ADDRESS */}

          <textarea
            name="address"
            placeholder="Enter Address"
            value={
              shopData.address
            }
            onChange={handleChange}
            rows="4"
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Submitting..."
              : "Add Shop"}

          </button>

        </form>

        {/* MESSAGE */}

        {message && (

          <p className="form-message">

            {message}

          </p>

        )}

      </div>

    </section>

  );
}

export default ShopForm;