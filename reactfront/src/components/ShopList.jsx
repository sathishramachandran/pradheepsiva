import { useEffect, useState } from "react";
import axios from "axios";

function ShopList() {

  const [shops, setShops] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [editShopId, setEditShopId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      shopName: "",
      ownerName: "",
      mobileNumber: "",
      address: "",
    });

  /* =========================
     GET SHOPS
  ========================= */

  const getShops = async () => {

    try {

      const response =
        await axios.get(
          "https://pradheepsiva.onrender.com/api/shop/all"
        );

      setShops(
        response.data.data || []
      );

    } catch (error) {

      console.log(error);

      setShops([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    getShops();

  }, []);

  /* =========================
     DELETE SHOP
  ========================= */

  const deleteShop = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are You Sure Want To Delete?"
      );

    if (!confirmDelete)
      return;

    try {

      await axios.delete(
        `https://pradheepsiva.onrender.com/api/shop/delete/${id}`
      );

      alert(
        "Shop Deleted Successfully"
      );

      getShops();

    } catch (error) {

      console.log(error);

      alert(
        "Delete Failed"
      );

    }

  };

  const handleEditClick = (shop) => {
    setEditShopId(shop._id);
    setEditData({
      shopName: shop.shopName || "",
      ownerName: shop.ownerName || "",
      mobileNumber: shop.mobileNumber || "",
      address: shop.address || "",
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const cancelEdit = () => {
    setEditShopId(null);
    setEditData({
      shopName: "",
      ownerName: "",
      mobileNumber: "",
      address: "",
    });
  };

  const updateShop = async (e) => {
    e.preventDefault();

    if (editData.mobileNumber.length !== 10) {
      return alert(
        "Mobile Number Must Be 10 Digits"
      );
    }

    try {
      await axios.put(
        `https://pradheepsiva.onrender.com/api/shop/update/${editShopId}`,
        editData
      );

      alert("Shop Updated Successfully");
      cancelEdit();
      getShops();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  /* =========================
     SEARCH FILTER
  ========================= */

  const filteredShops =
    shops.filter(
      (shop) =>
        shop.shopName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        shop.ownerName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        shop.mobileNumber
          ?.includes(search)
    );

  /* =========================
     UI
  ========================= */

  return (

    <div className="shop-list-page">

      {/* TITLE */}

      <h1 className="page-title">

        Shop List

      </h1>

      {/* SEARCH */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search Shop / Owner / Mobile"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      {/* LOADING */}

      {

        loading ? (

          <h2 className="loading-text">

            Loading...

          </h2>

        ) : filteredShops.length ===
          0 ? (

          <h2 className="empty-text">

            No Shops Found

          </h2>

        ) : (

          <div className="shop-grid">

            {

              filteredShops.map(
                (shop) => (

                  <div
                    className="shop-card"
                    key={
                      shop._id
                    }
                  >

                    <h2>

                      {
                        shop.shopName
                      }

                    </h2>

                    <p>

                      <strong>
                        Owner :
                      </strong>

                      {
                        shop.ownerName
                      }

                    </p>

                    <p>

                      <strong>
                        Mobile :
                      </strong>

                      {
                        shop.mobileNumber
                      }

                    </p>

                    <p>

                      <strong>
                        Address :
                      </strong>

                      {
                        shop.address
                      }

                    </p>

                    {/* ACTIONS */}

                    <div className="shop-btn-group">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEditClick(
                            shop
                          )
                        }
                      >

                        Edit

                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteShop(
                            shop._id
                          )
                        }
                      >

                        Delete

                      </button>

                    </div>

                    {editShopId === shop._id && (
                      <form
                        className="shop-edit-form"
                        onSubmit={updateShop}
                      >
                        <h3>Edit Shop Details</h3>

                        <input
                          type="text"
                          name="shopName"
                          placeholder="Shop Name"
                          value={editData.shopName}
                          onChange={handleEditChange}
                          required
                        />

                        <input
                          type="text"
                          name="ownerName"
                          placeholder="Owner Name"
                          value={editData.ownerName}
                          onChange={handleEditChange}
                          required
                        />

                        <input
                          type="number"
                          name="mobileNumber"
                          placeholder="Mobile Number"
                          value={editData.mobileNumber}
                          onChange={handleEditChange}
                          required
                        />

                        <textarea
                          name="address"
                          rows="3"
                          placeholder="Address"
                          value={editData.address}
                          onChange={handleEditChange}
                          required
                        />

                        <div className="shop-edit-actions">
                          <button type="submit">
                            Save
                          </button>
                          <button
                            type="button"
                            className="cancel-btn"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}

                  </div>

                )
              )

            }

          </div>

        )

      }

    </div>

  );
}

export default ShopList;