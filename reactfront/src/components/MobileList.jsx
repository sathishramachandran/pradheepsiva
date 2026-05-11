import { useEffect, useState } from "react";
import axios from "axios";

function MobileList() {

  const [mobiles, setMobiles] = useState([]);

  /* =========================
     GET ALL MOBILES
  ========================= */

  const getMobiles = async () => {

    try {

      const response = await axios.get(
        "https://pradheepsiva.onrender.com/api/mobile/all"
      );

      setMobiles(response.data.data || []);

    } catch (error) {

      console.log(error);

      setMobiles([]);

    }
  };

  useEffect(() => {

    getMobiles();

  }, []);

  /* =========================
     ALERT NOTIFICATION
  ========================= */

  useEffect(() => {

    mobiles.forEach((mobile) => {

      // SKIP COMPLETED
      if (mobile.status === "Completed") return;

      const today = new Date();

      const entryDate = new Date(
        mobile.entryDate
      );

      const diffTime =
        today - entryDate;

      const diffDays = Math.floor(
        diffTime /
          (1000 * 60 * 60 * 24)
      );

      // ALERT AFTER 3 DAYS
      if (diffDays >= 3) {

        alert(
          `${mobile.mobileModel} repair pending for ${diffDays} days`
        );

      }

    });

  }, [mobiles]);

  /* =========================
     DELETE MOBILE
  ========================= */

  const deleteMobile = async (id) => {

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
     GROUP BY SHOP NAME
  ========================= */

  const groupedMobiles =
    Array.isArray(mobiles)

      ? mobiles.reduce(
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
        )

      : {};

  /* =========================
     UI
  ========================= */

  return (

    <div className="mobile-list">

      <h1 className="main-title">
        Mobile Repair List
      </h1>

      {

        Object.keys(groupedMobiles)
          .length === 0

          ? (

            <h2>
              No Mobiles Found
            </h2>

          )

          : (

            Object.keys(
              groupedMobiles
            ).map((shopName) => (

              <div
                key={shopName}
                className="shop-section"
              >

                {/* SHOP TITLE */}

                <h2 className="shop-title">
                  {shopName}
                </h2>

                {/* MOBILE LIST */}

                {

                  groupedMobiles[
                    shopName
                  ].map((mobile) => {

                    // DAYS CALCULATION
                    const today =
                      new Date();

                    const entryDate =
                      new Date(
                        mobile.entryDate
                      );

                    const diffTime =
                      today - entryDate;

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
                        key={mobile._id}
                      >

                        <p>
                          <strong>
                            Brand :
                          </strong>{" "}
                          {
                            mobile.mobileBrand
                          }
                        </p>

                        <p>
                          <strong>
                            Model :
                          </strong>{" "}
                          {
                            mobile.mobileModel
                          }
                        </p>

                        <p>
                          <strong>
                            Issue :
                          </strong>{" "}
                          {
                            mobile.mobileIssue
                          }
                        </p>

                        <p>
                          <strong>
                            Parts :
                          </strong>{" "}
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
                            Entry Date :
                          </strong>{" "}
                          {
                            mobile.entryDate
                          }
                        </p>

                        <p>
                          <strong>
                            Status :
                          </strong>{" "}
                          {
                            mobile.status
                          }
                        </p>

                        {/* ALERT MESSAGE */}

                        {

                          mobile.status !==
                            "Completed" &&

                          diffDays >= 3 && (

                            <p
                              style={{
                                color: "red",
                                fontWeight:
                                  "bold",
                                fontSize:
                                  "18px",
                              }}
                            >
                              🔴 Repair Pending More
                              Than 3 Days
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
                            Out Delivery
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

                  })

                }

              </div>

            ))

          )

      }

    </div>

  );
}

export default MobileList;