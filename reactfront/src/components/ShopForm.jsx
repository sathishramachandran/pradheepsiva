import { useState } from "react";
import axios from "axios";

function ShopForm() {

  const [shopData, setShopData] = useState({
    shopName: "",
    ownerName: "",
    mobileNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {

    setShopData({
      ...shopData,
      [e.target.name]: e.target.value,
    });

  };

  /* =========================
     HANDLE SUBMIT
  ========================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    // VALIDATION

    if (
      !shopData.shopName ||
      !shopData.ownerName ||
      !shopData.mobileNumber ||
      !shopData.address
    ) {

      alert("Please Fill All Fields");

      return;

    }

    // MOBILE NUMBER VALIDATION

    if (shopData.mobileNumber.length !== 10) {

      alert(
        "Mobile Number Must Be 10 Digits"
      );

      return;

    }

    try {

      setLoading(true);

      await axios.post(
        "https://pradheepsiva.onrender.com/api/shop/add",
        shopData
      );

      alert(
        "Shop Added Successfully"
      );

      // CLEAR FORM

      setShopData({
        shopName: "",
        ownerName: "",
        mobileNumber: "",
        address: "",
      });

    } catch (error) {

      console.log(error);

      alert("Submit Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="newentry">

      <h2>
        Enter New Shop
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="shopName"
          placeholder="Shop Name"
          value={shopData.shopName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={shopData.ownerName}
          onChange={handleChange}
        />

        <input
          type="number"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={shopData.mobileNumber}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          value={shopData.address}
          onChange={handleChange}
        />

        <button type="submit">

          {
            loading
              ? "Submitting..."
              : "Submit"
          }

        </button>

      </form>

    </section>

  );
}

export default ShopForm;