import { useEffect, useState } from "react";

import axios from "axios";

function ShopMobiles() {

  const [mobiles, setMobiles] =
    useState([]);

  const getMobiles = async () => {

    try {

      const shopName =
        localStorage.getItem(
          "shopName"
        );

      const response =
        await axios.get(
          `https://pradheepsiva.onrender.com/api/mobile/shop/${shopName}`
        );

      setMobiles(
        response.data.data || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    getMobiles();

  }, []);

  return (

    <div className="mobile-list">

      <h1>
        Shop Mobiles
      </h1>

      <div className="shop-section">

        {

          mobiles.map((mobile) => (

            <div
              className="mobile-card"
              key={mobile._id}
            >

              <p>
                Brand :
                {
                  mobile.mobileBrand
                }
              </p>

              <p>
                Model :
                {
                  mobile.mobileModel
                }
              </p>

              <p>
                Issue :
                {
                  mobile.mobileIssue
                }
              </p>

              <p>
                Status :
                {
                  mobile.status
                }
              </p>

            </div>

          ))

        }

      </div>

    </div>

  );
}

export default ShopMobiles;