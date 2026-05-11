import { useEffect, useState } from "react";
import axios from "axios";

function ShopList() {

  const [shops, setShops] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

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