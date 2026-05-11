import { useEffect, useState } from "react";

import axios from "axios";

function Home() {

  const [mobiles, setMobiles] =
    useState([]);

  const shopName =
    localStorage.getItem(
      "shopName"
    );

  /* =========================
     GET MOBILES
  ========================= */

  const getMobiles = async () => {

    try {

      let response;

      // SHOP LOGIN

      if (shopName) {

        response =
          await axios.get(
            `https://pradheepsiva.onrender.com/api/mobile/shop/${shopName}`
          );

      }

      // ADMIN

      else {

        response =
          await axios.get(
            "https://pradheepsiva.onrender.com/api/mobile/all"
          );

      }

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

  /* =========================
     COUNT
  ========================= */

  const totalMobiles =
    mobiles.length;

  const pendingMobiles =
    mobiles.filter(

      (item) =>
        item.status !==
        "Completed"

    ).length;

  const completedMobiles =
    mobiles.filter(

      (item) =>
        item.status ===
        "Completed"

    ).length;

  /* =========================
     UI
  ========================= */

  return (

    <div className="home-page">

      <h1>
        Welcome to
        Pradheepsiva Mobiles
      </h1>

      {

        shopName && (

          <h2>
            Shop :
            {shopName}
          </h2>

        )

      }

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <h2>
            Total Mobiles
          </h2>

          <h1>
            {totalMobiles}
          </h1>

        </div>

        <div className="dashboard-card">

          <h2>
            Pending Repairs
          </h2>

          <h1>
            {pendingMobiles}
          </h1>

        </div>

        <div className="dashboard-card">

          <h2>
            Completed Repairs
          </h2>

          <h1>
            {completedMobiles}
          </h1>

        </div>

      </div>

    </div>

  );
}

export default Home;