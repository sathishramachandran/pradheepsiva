import { useState } from "react";

import axios from "axios";

function ShopForm() {

  /* =========================
     STATE
  ========================= */

  const [loading, setLoading] =
    useState(false);

  const [successData, setSuccessData] =
    useState(null);

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
     SUBMIT
  ========================= */

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    /* VALIDATION */

    if (
      shopData.mobileNumber
        .length !== 10
    ) {

      return alert(
        "Mobile Number Must Be 10 Digits"
      );

    }

    setLoading(true);

    try {

      /* ADD SHOP */

      await axios.post(

        "https://pradheepsiva.onrender.com/api/shop/add",

        shopData

      );

      /* CREATE LOGIN */

      const username =

        shopData.shopName
          .toLowerCase()
          .replace(/\s/g, "");

      const password =
        shopData.mobileNumber;

      await axios.post(

        "https://pradheepsiva.onrender.com/api/user/create",

        {

          shopName:
            shopData.shopName,

          username,

          password,

          role: "shop",

        }

      );

      /* SUCCESS */

      setSuccessData({

        username,

        password,

      });

      alert(
        "Shop Added Successfully"
      );

      /* RESET */

      setShopData({

        shopName: "",

        ownerName: "",

        mobileNumber: "",

        address: "",

      });

    } catch (error) {

      console.log(error);

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

          Add New Shop

        </h2>

        <form
          onSubmit={handleSubmit}
          className="shop-form"
        >

          {/* SHOP */}

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

          {/* OWNER */}

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

          {/* MOBILE */}

          <input
            type="number"
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
            rows="4"
            placeholder="Enter Address"
            value={
              shopData.address
            }
            onChange={handleChange}
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >

            {

              loading

                ? "Creating..."

                : "Add Shop"

            }

          </button>

        </form>

        {/* LOGIN DETAILS */}

        {

          successData && (

            <div className="success-card">

              <h3>
                Shop Login Created
              </h3>

              <p>

                <strong>
                  Username :
                </strong>

                {" "}

                {
                  successData.username
                }

              </p>

              <p>

                <strong>
                  Password :
                </strong>

                {" "}

                {
                  successData.password
                }

              </p>

            </div>

          )

        }

      </div>

    </section>

  );
}

export default ShopForm;