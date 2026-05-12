import { useEffect, useState } from "react";

import axios from "axios";

function ShopMobiles() {

  /* =========================
     STATE
  ========================= */

  const [mobiles, setMobiles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const shopName =
    localStorage.getItem(
      "shopName"
    );

  /* =========================
     GET MOBILES
  ========================= */

  const getMobiles = async () => {

    try {

      const response =
        await axios.get(
          `https://pradheepsiva.onrender.com/api/mobile/shop/${shopName}`
        );

      const latestMobiles =
        response.data.data || [];

      /* NOTIFICATION */

      latestMobiles.forEach((mobile) => {

        if (
          mobile.status ===
          "Completed"
        ) {

          new Notification(

            "Repair Completed ✅",

            {

              body:
                `${mobile.mobileBrand} ${mobile.mobileModel} Ready`

            }

          );

        }

      });

      setMobiles(latestMobiles);

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

    Notification.requestPermission();

    getMobiles();

    const interval =
      setInterval(() => {

        getMobiles();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {

    localStorage.clear();

    window.location.href =
      "/shoplogin";

  };

  /* =========================
     SEARCH FILTER
  ========================= */

  const filteredMobiles =
    mobiles.filter(
      (mobile) =>

        mobile.mobileBrand
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        mobile.mobileModel
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );

  /* =========================
     STATUS STYLE
  ========================= */

  const getStatusClass = (
    status
  ) => {

    if (
      status === "Completed"
    ) {

      return "completed";

    }

    if (
      status === "Out Delivery"
    ) {

      return "delivery";

    }

    if (
      status === "Return"
    ) {

      return "return";

    }

    return "pending";

  };

  /* =========================
     UI
  ========================= */

  return (

    <div className="shop-mobile-page">

      {/* HEADER */}

      <div className="shop-header">

        <div>

          <h1>
            Shop Mobiles
          </h1>

          <h3>
            Shop :
            {shopName}
          </h3>

        </div>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >

          Logout

        </button>

      </div>

      {/* SEARCH */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search Mobile..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      {/* LIST */}

      {

        loading ? (

          <h2 className="loading-text">

            Loading...

          </h2>

        ) : filteredMobiles.length ===
          0 ? (

          <h2 className="empty-text">

            No Mobiles Found

          </h2>

        ) : (

          <div className="mobile-grid">

            {

              filteredMobiles.map(
                (mobile) => (

                  <div
                    className="mobile-card"
                    key={
                      mobile._id
                    }
                  >

                    <h2>

                      {
                        mobile.mobileBrand
                      }

                    </h2>


               

                    <p>

                      <strong>
                        Model :
                      </strong>

                      {
                        mobile.mobileModel
                      }

                    </p>

                    <p>

                      <strong>
                        Issue :
                      </strong>

                      {
                        mobile.mobileIssue
                      }

                    </p>

               

                    <p>

                      <strong>
                        Entry :
                      </strong>

                      {
                        mobile.entryDate
                      }

                    </p>

                    <p>

                      <strong>
                        Remaining :
                      </strong>

                      {

                        mobile.remainingDays || 0

                      }

                      {" "}Days

                    </p>

                    {/* PARTS */}

                    <div className="parts-box">

                      <strong>
                        Parts :
                      </strong>

                      {

                        mobile.mobileParts &&
                        mobile.mobileParts.length > 0

                          ? (

                            <ul>

                              {

                                mobile.mobileParts.map(
                                  (
                                    part,
                                    index
                                  ) => (

                                    <li
                                      key={
                                        index
                                      }
                                    >

                                      {
                                        part
                                      }

                                    </li>

                                  )
                                )

                              }

                            </ul>

                          )

                          : (

                            <p>
                              No Parts
                            </p>

                          )

                      }

                    </div>

                    {/* STATUS */}

                    <div
                      className={`status-box ${getStatusClass(
                        mobile.status
                      )}`}
                    >

                      {
                        mobile.status
                      }

                    </div>

                    {/* WHATSAPP */}

                    <button
                      className="whatsapp-btn"
                      onClick={() => {

                        const message =

`Hello ${mobile.customerName},

Your Mobile Repair Status

Brand :
${mobile.mobileBrand}

Model :
${mobile.mobileModel}

Status :
${mobile.status}

- Pradheepsiva Mobiles`;

                        window.open(

`https://wa.me/91${mobile.customerPhone}?text=${encodeURIComponent(message)}`

                        );

                      }}
                    >

                      WhatsApp

                    </button>

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

export default ShopMobiles;