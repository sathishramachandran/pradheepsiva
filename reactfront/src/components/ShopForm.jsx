import { useState } from "react";
import axios from "axios";

function ShopForm() {

  const [loading, setLoading] = useState(false);

  const [successData, setSuccessData] = useState(null);

  const [shopData, setShopData] = useState({
    shopName: "",
    ownerName: "",
    mobileNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    shopName: "",
    ownerName: "",
    mobileNumber: "",
    address: "",
  });

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "shopName") {

      setShopData({
        ...shopData,
        shopName: value.replace(/[^A-Za-z0-9\s]/g, "")
      });

    }

    else if (name === "ownerName") {

      setShopData({
        ...shopData,
        ownerName: value.replace(/[^A-Za-z\s]/g, "")
      });

    }

    else if (name === "mobileNumber") {

      const mobile = value.replace(/\D/g, "");

      if (mobile.length <= 10) {

        setShopData({
          ...shopData,
          mobileNumber: mobile
        });

      }

    }

    else {

      setShopData({
        ...shopData,
        [name]: value
      });

    }

    setErrors({
      ...errors,
      [name]: ""
    });

  };

  // =========================
  // VALIDATION
  // =========================

  const validate = () => {

    let newErrors = {};

    if (!shopData.shopName.trim()) {
      newErrors.shopName = "Shop Name is required";
    } else if (shopData.shopName.trim().length < 3) {
      newErrors.shopName = "Minimum 3 characters";
    }

    if (!shopData.ownerName.trim()) {
      newErrors.ownerName = "Owner Name is required";
    } else if (shopData.ownerName.trim().length < 3) {
      newErrors.ownerName = "Minimum 3 characters";
    }

    if (!shopData.mobileNumber) {
      newErrors.mobileNumber = "Mobile Number is required";
    } else if (!/^[6-9]\d{9}$/.test(shopData.mobileNumber)) {
      newErrors.mobileNumber = "Enter valid 10 digit mobile";
    }

    if (!shopData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (shopData.address.trim().length < 10) {
      newErrors.address = "Minimum 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {

      await axios.post(
        "https://pradheepsiva.onrender.com/api/shop/add",
        shopData
      );

      const username = shopData.shopName
        .toLowerCase()
        .replace(/\s/g, "");

      const password = shopData.mobileNumber;

      await axios.post(
        "https://pradheepsiva.onrender.com/api/user/create",
        {
          shopName: shopData.shopName,
          username,
          password,
          role: "shop",
        }
      );

      setSuccessData({
        username,
        password,
      });

      alert("Shop Added Successfully");

      setShopData({
        shopName: "",
        ownerName: "",
        mobileNumber: "",
        address: "",
      });

      setErrors({
        shopName: "",
        ownerName: "",
        mobileNumber: "",
        address: "",
      });

    } catch (error) {

      console.log(error);

      alert("Failed To Add Shop");

    } finally {

      setLoading(false);

    }

  };
    // =========================
  // UI
  // =========================

  return (
    <section className="shop-form-page">
      <div className="shop-form-container">

        <h2 className="form-title">
          Add New Shop
        </h2>

        <form
          onSubmit={handleSubmit}
          className="shop-form"
        >

          {/* Shop Name */}

          <input
            type="text"
            name="shopName"
            placeholder="Enter Shop Name"
            value={shopData.shopName}
            onChange={handleChange}
          />

          {errors.shopName && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginBottom: "10px"
              }}
            >
              {errors.shopName}
            </p>
          )}

          {/* Owner Name */}

          <input
            type="text"
            name="ownerName"
            placeholder="Enter Owner Name"
            value={shopData.ownerName}
            onChange={handleChange}
          />

          {errors.ownerName && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginBottom: "10px"
              }}
            >
              {errors.ownerName}
            </p>
          )}

          {/* Mobile */}

          <input
            type="text"
            name="mobileNumber"
            placeholder="Enter Mobile Number"
            value={shopData.mobileNumber}
            onChange={handleChange}
            maxLength={10}
          />

          {errors.mobileNumber && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginBottom: "10px"
              }}
            >
              {errors.mobileNumber}
            </p>
          )}

          {/* Address */}

          <textarea
            name="address"
            rows="4"
            placeholder="Enter Address"
            value={shopData.address}
            onChange={handleChange}
          />

          {errors.address && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginBottom: "10px"
              }}
            >
              {errors.address}
            </p>
          )}

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Add Shop"}
          </button>

        </form>

        {/* Success Card */}

        {successData && (
          <div className="success-card">

            <h3>Shop Login Created</h3>

            <p>
              <strong>Username :</strong>{" "}
              {successData.username}
            </p>

            <p>
              <strong>Password :</strong>{" "}
              {successData.password}
            </p>

          </div>
        )}

      </div>
    </section>
  );
}

export default ShopForm;