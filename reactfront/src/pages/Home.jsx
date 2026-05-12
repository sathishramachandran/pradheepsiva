import { useEffect, useState } from "react";

import axios from "axios";

function Home() {

  /* =========================
     STATE
  ========================= */

  const [mobiles, setMobiles] =
    useState([]);

  const [shops, setShops] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const shopName =
    localStorage.getItem(
      "shopName"
    );

  const role =
    localStorage.getItem(
      "role"
    );

  /* =========================
     GET DATA
  ========================= */

  const getData = async () => {

    try {

      let mobileResponse;

      /* SHOP LOGIN */

      if (
        role === "shop" &&
        shopName
      ) {

        mobileResponse =
          await axios.get(
            `https://pradheepsiva.onrender.com/api/mobile/shop/${shopName}`
          );

      }

      /* ADMIN */

      else {

        mobileResponse =
          await axios.get(
            "https://pradheepsiva.onrender.com/api/mobile/all"
          );

      }

      const shopResponse =
        await axios.get(
          "https://pradheepsiva.onrender.com/api/shop/all"
        );

      setMobiles(
        mobileResponse.data.data || []
      );

      setShops(
        shopResponse.data.data || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  /* =========================
     AUTO REFRESH
  ========================= */

  useEffect(() => {

    getData();

    const interval =
      setInterval(() => {

        getData();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  /* =========================
     COUNTS
  ========================= */

  const totalMobiles =
    mobiles.length;

  const pendingMobiles =
    mobiles.filter(
      (item) =>
        item.status ===
        "Pending"
    ).length;

  const completedMobiles =
    mobiles.filter(
      (item) =>
        item.status ===
        "Completed"
    ).length;

  const deliveryMobiles =
    mobiles.filter(
      (item) =>
        item.status ===
        "Out Delivery"
    ).length;

  const totalShops =
    shops.length;

  const todayDate =
    new Date()
      .toISOString()
      .split("T")[0];

  const todayEntries =
    mobiles.filter(
      (item) =>
        item.entryDate ===
        todayDate
    ).length;

  /* =========================
     RECENT ENTRIES
  ========================= */

  const recentMobiles =
    mobiles.slice(0, 5);

  /* =========================
     UI
  ========================= */

  return (

    <div className="home-page">

      {/* HEADER */}

      <div className="welcome-box">

        <h1>
          Welcome To
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

      </div>

      {/* DASHBOARD */}

      <div className="dashboard-grid">

        {/* TOTAL */}

        <div className="dashboard-card">

          <h3>
            Total Mobiles
          </h3>

          <h1>
            {totalMobiles}
          </h1>

        </div>

        {/* PENDING */}

        <div className="dashboard-card pending-card">

          <h3>
            Pending Repairs
          </h3>

          <h1>
            {pendingMobiles}
          </h1>

        </div>

        {/* COMPLETED */}

        <div className="dashboard-card completed-card">

          <h3>
            Completed Repairs
          </h3>

          <h1>
            {completedMobiles}
          </h1>

        </div>

        {/* DELIVERY */}

        <div className="dashboard-card delivery-card">

          <h3>
            Out Delivery
          </h3>

          <h1>
            {deliveryMobiles}
          </h1>

        </div>

        {/* SHOPS */}

        <div className="dashboard-card shop-card">

          <h3>
            Total Shops
          </h3>

          <h1>
            {totalShops}
          </h1>

        </div>

        {/* TODAY */}

        <div className="dashboard-card today-card">

          <h3>
            Today Entries
          </h3>

          <h1>
            {todayEntries}
          </h1>

        </div>

      </div>

      {/* RECENT ENTRIES */}

      <div className="recent-section">

        <h2>
          Recent Mobile Entries
        </h2>

        {

          loading ? (

            <p>
              Loading...
            </p>

          ) : recentMobiles.length ===
            0 ? (

            <p>
              No Mobile Entries Found
            </p>

          ) : (

            <table>

              <thead>

                <tr>

                  <th>
                    Shop
                  </th>

                  <th>
                    Brand
                  </th>

                  <th>
                    Model
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  recentMobiles.map(
                    (item) => (

                      <tr
                        key={
                          item._id
                        }
                      >

                        <td>
                          {
                            item.shopName
                          }
                        </td>

                        <td>
                          {
                            item.mobileBrand
                          }
                        </td>

                        <td>
                          {
                            item.mobileModel
                          }
                        </td>

                        <td>

                          <span
                            className={

                              item.status ===
                              "Completed"

                                ? "completed-status"

                                : item.status ===
                                  "Out Delivery"

                                ? "delivery-status"

                                : item.status ===
                                  "Return"

                                ? "return-status"

                                : "pending-status"

                            }
                          >

                            {
                              item.status
                            }

                          </span>

                        </td>

                      </tr>

                    )
                  )

                }

              </tbody>

            </table>

          )

        }

      </div>

      {/* FOOTER */}

      <div className="developer-footer">

        <h3>
          Developed By Sathish
        </h3>

        <p>
          📞 9488909434
        </p>

        <p className="contact-dev">

          🌐 Need Website Or
          Mobile Shop Software?

          Contact :
          9488909434

        </p>

        <h4 className="business-quote">

          "Smart Repair Management
          For Smart Mobile Business"

        </h4>

        <p className="business-text">

          Helping Mobile Shops
          Manage Repairs,
          Delivery, Customers &
          Service Status
          Professionally.

        </p>

      </div>

    </div>

  );
}

export default Home;