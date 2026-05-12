import { useEffect, useState } from "react";
import axios from "axios";

function ShopMobiles() {

  const [mobiles, setMobiles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

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
     LOGOUT
  ========================= */

  const handleLogout = () => {

    localStorage.clear();

    window.location.href =
      "/login";

  };

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

      {/* MOBILE LIST */}

      {

        loading ? (

          <h2 className="loading-text">

            Loading...

          </h2>

        ) : mobiles.length ===
          0 ? (

          <h2 className="empty-text">

            No Mobile Entries Found

          </h2>

        ) : (

          <div className="mobile-grid">

            {

              mobiles.map(
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
                        Entry Date :
                      </strong>

                      {
                        mobile.entryDate
                      }

                    </p>

                    <p>

                      <strong>
                        Remaining Days :
                      </strong>

                      {
                        mobile.remainingDays ||
                        0
                      }

                    </p>

                    {/* PARTS */}

                    <div className="parts-box">

                      <strong>
                        Parts :
                      </strong>

                      {

                        mobile.mobileParts &&
                        mobile.mobileParts
                          .length >
                          0 ? (

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

                        ) : (

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