import { useEffect, useState } from "react";
import axios from "axios";

function ShopList() {

  const [shops, setShops] = useState([]);

  /* =========================
     GET ALL SHOPS
  ========================= */

  const getShops = async () => {

    try {

      const response = await axios.get(
        "https://pradheepsiva.onrender.com/api/shop/all"
      );

      console.log(response.data);

      // IMPORTANT FIX
      setShops(response.data.data || []);

    } catch (error) {

      console.log(error);

    }
  };

  /* =========================
     DELETE SHOP
  ========================= */

  const deleteShop = async (id) => {

    try {

      await axios.delete(
        `https://pradheepsiva.onrender.com/api/shop/delete/${id}`
      );

      setShops(
        shops.filter(
          (shop) => shop._id !== id
        )
      );

      alert("Shop Removed Successfully");

    } catch (error) {

      console.log(error);

    }
  };

  /* =========================
     EDIT SHOP
  ========================= */

  const editShop = async (id) => {

    const shopName =
      prompt("Enter Shop Name");

    const ownerName =
      prompt("Enter Owner Name");

    const mobileNumber =
      prompt("Enter Mobile Number");

    const address =
      prompt("Enter Address");

    try {

      await axios.put(
        `https://pradheepsiva.onrender.com/api/shop/update/${id}`,
        {
          shopName,
          ownerName,
          mobileNumber,
          address,
        }
      );

      alert("Shop Updated Successfully");

      getShops();

    } catch (error) {

      console.log(error);

    }
  };

  /* =========================
     USE EFFECT
  ========================= */

  useEffect(() => {

    getShops();

  }, []);

  /* =========================
     UI
  ========================= */

  return (

    <div className="mobile-list">

      <h2>Shop List</h2>

      {shops.length === 0 ? (

        <h3>No Shops Found</h3>

      ) : (

        Array.isArray(shops) &&
        shops.map((shop) => (

          <div
            className="mobile-card"
            key={shop._id}
          >

            <h3>
              {shop.shopName}
            </h3>

            <p>
              Owner Name :
              {shop.ownerName}
            </p>

            <p>
              Mobile Number :
              {shop.mobileNumber}
            </p>

            <p>
              Address :
              {shop.address}
            </p>

            {/* DELETE BUTTON */}
            <button
              onClick={() =>
                deleteShop(shop._id)
              }
              className="delete-btn"
            >
              Remove
            </button>

            {/* EDIT BUTTON */}
            <button
              onClick={() =>
                editShop(shop._id)
              }
              className="edit-btn"
            >
              Edit
            </button>

          </div>

        ))
      )}

    </div>
  );
}

export default ShopList;