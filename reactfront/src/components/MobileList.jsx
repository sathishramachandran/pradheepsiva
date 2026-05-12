import { useEffect, useState } from "react";
import axios from "axios";

function MobileList() {

  const [mobiles, setMobiles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("All");

  /* =========================
     GET ALL MOBILES
  ========================= */

  const getMobiles = async () => {

    try {

      const response =
        await axios.get(
          "https://pradheepsiva.onrender.com/api/mobile/all"
        );

      setMobiles(
        response.data.data || []
      );

    } catch (error) {

      console.log(error);

      setMobiles([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    getMobiles();

  }, []);

  /* =========================
     DELETE MOBILE
  ========================= */

  const deleteMobile = async (
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
        `https://pradheepsiva.onrender.com/api/mobile/delete/${id}`
      );

      alert(
        "Mobile Deleted Successfully"
      );

      getMobiles();

    } catch (error) {

      console.log(error);

    }

  };

  /* =========================
     UPDATE STATUS
  ========================= */

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(
        `https://pradheepsiva.onrender.com/api/mobile/status/${id}`,
        {
          status,
        }
      );

      alert(
        `Status Updated To ${status}`
      );

      getMobiles();

    } catch (error) {

      console.log(error);

    }

  };

  /* =========================
     FILTER
  ========================= */

  const filteredMobiles =
    mobiles.filter(
      (mobile) => {

        const searchMatch =

          mobile.shopName
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          mobile.mobileBrand
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          mobile.mobileModel
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const statusMatch =

          filterStatus ===
          "All"

            ? true

            : mobile.status ===
              filterStatus;

        return (
          searchMatch &&
          statusMatch
        );

      }
    );

  /* =========================
     GROUP BY SHOP
  ========================= */

  const groupedMobiles =
    filteredMobiles.reduce(
      (groups, mobile) => {

        if (
          !groups[
            mobile.shopName
          ]
        ) {

          groups[
            mobile.shopName
          ] = [];

        }

        groups[
          mobile.shopName
        ].push(mobile);

        return groups;

      },

      {}
    );

  /* =========================
     STATUS CLASS
  ========================= */

  const getStatusClass = (
    status
  ) => {

    if (
      status === "Completed"
    )
      return "completed";

    if (
      status === "Pending"
    )
      return "pending";

    if (
      status === "Return"
    )
      return "return";

    return "delivery";

  };

  /* =========================
     UI
  ========================= */

  return (

    <div className="mobile-list-page">

      <h1 className="main-title">

        Mobile Repair List

      </h1>

      {/* SEARCH & FILTER */}

      <div className="top-controls">

        <input
          type="text"
          placeholder="Search Shop / Brand / Model"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value
            )
          }
        >

          <option value="All">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Return">
            Return
          </option>

          <option value="Out Delivery">
            Delivery
          </option>

        </select>

      </div>

      {/* LOADING */}

      {

        loading ? (

          <h2 className="loading-text">

            Loading...

          </h2>

        ) : Object.keys(
            groupedMobiles
          ).length === 0 ? (

          <h2 className="empty-text">

            No Mobiles Found

          </h2>

        ) : (

          Object.keys(
            groupedMobiles
          ).map(
            (shopName) => (

              <div
                key={shopName}
                className="shop-section"
              >

                {/* SHOP TITLE */}

                <h2 className="shop-title">

                  {shopName}

                </h2>

                {/* MOBILE GRID */}

                <div className="mobile-grid">

                  {

                    groupedMobiles[
                      shopName
                    ].map(
                      (
                        mobile
                      ) => {

                        const today =
                          new Date();

                        const entryDate =
                          new Date(
                            mobile.entryDate
                          );

                        const diffTime =
                          today -
                          entryDate;

                        const diffDays =
                          Math.floor(
                            diffTime /
                              (1000 *
                                60 *
                                60 *
                                24)
                          );

                        return (

                          <div
                            className="mobile-card"
                            key={
                              mobile._id
                            }
                          >

                            <h3>

                              {
                                mobile.mobileBrand
                              }

                            </h3>

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
                                Parts :
                              </strong>

                              {

                                Array.isArray(
                                  mobile.mobileParts
                                )
                                  ? mobile.mobileParts.join(
                                      ", "
                                    )
                                  : ""

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

                            {/* ALERT */}

                            {

                              mobile.status !==
                                "Completed" &&
                                diffDays >=
                                  3 && (

                                  <p className="alert-text">

                                    🔴 Repair Pending More Than 3 Days

                                  </p>

                                )

                            }

                            {/* BUTTONS */}

                            <div className="btn-group">

                              <button
                                className="pending-btn"
                                onClick={() =>
                                  updateStatus(
                                    mobile._id,
                                    "Pending"
                                  )
                                }
                              >

                                Pending

                              </button>

                              <button
                                className="return-btn"
                                onClick={() =>
                                  updateStatus(
                                    mobile._id,
                                    "Return"
                                  )
                                }
                              >

                                Return

                              </button>

                              <button
                                className="complete-btn"
                                onClick={() =>
                                  updateStatus(
                                    mobile._id,
                                    "Completed"
                                  )
                                }
                              >

                                Completed

                              </button>

                              <button
                                className="delivery-btn"
                                onClick={() =>
                                  updateStatus(
                                    mobile._id,
                                    "Out Delivery"
                                  )
                                }
                              >

                                Delivery

                              </button>

                              <button
                                className="delete-btn"
                                onClick={() =>
                                  deleteMobile(
                                    mobile._id
                                  )
                                }
                              >

                                Delete

                              </button>

                            </div>

                          </div>

                        );

                      }
                    )

                  }

                </div>

              </div>

            )
          )

      }

    </div>

  );
}

export default MobileList;