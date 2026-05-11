import { useEffect, useState } from "react";

import axios from "axios";

function ShopList() {

  const [shops, setShops] =
    useState([]);

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

    }

  };

  useEffect(() => {

    getShops();

  }, []);

  const deleteShop = async (id) => {

    try {

      await axios.delete(
        `https://pradheepsiva.onrender.com/api/shop/delete/${id}`
      );

      getShops();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="mobile-list">

      <h1>
        Shop List
      </h1>

      <div className="shop-section">

        {

          shops.map((shop) => (

            <div
              className="mobile-card"
              key={shop._id}
            >

              <h2>
                {shop.shopName}
              </h2>

              <p>
                Owner :
                {
                  shop.ownerName
                }
              </p>

              <p>
                Mobile :
                {
                  shop.mobileNumber
                }
              </p>

              <p>
                Address :
                {
                  shop.address
                }
              </p>

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

          ))

        }

      </div>

    </div>

  );
}

export default ShopList;