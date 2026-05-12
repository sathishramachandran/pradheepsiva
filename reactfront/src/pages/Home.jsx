import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [mobiles, setMobiles] =
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
     GET MOBILES
  ========================= */

  const getMobiles = async () => {

    try {

      let response;

      // SHOP LOGIN

      if (
        role === "shop" &&
        shopName
      ) {

        response =
          await axios.get(
            `https://pradheepsiva.onrender.com/api/mobile/shop/${shopName}`
          );

      }

      // ADMIN LOGIN

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

    } finally {

      setLoading(false);

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
     RECENT MOBILES
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

        <div className="dashboard-card">

          <h3>
            Total Mobiles
          </h3>

          <h1>
            {totalMobiles}
          </h1>

        </div>

        <div className="dashboard-card pending-card">

          <h3>
            Pending Repairs
          </h3>

          <h1>
            {pendingMobiles}
          </h1>

        </div>

        <div className="dashboard-card completed-card">

          <h3>
            Completed Repairs
          </h3>

          <h1>
            {completedMobiles}
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