import { useEffect, useState } from "react";
import axios from "axios";

function MobileList() {

  const [mobiles, setMobiles] = useState([]);

  console.log("Mobiles State:", mobiles);

  /* =========================
     GET ALL MOBILES
  ========================= */

  const getMobiles = async () => {

    try {

      const response = await axios.get(
        "https://pradheepsiva.onrender.com/api/mobile/all"
      );

      console.log(response.data);

      // SAFE ARRAY FIX
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
     DELETE MOBILE
  ========================= */

  const deleteMobile = async (id) => {

    try {

      await axios.delete(
        `https://pradheepsiva.onrender.com/api/mobile/delete/${id}`
      );

      alert("Mobile Deleted Successfully");

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

      getMobiles();

    } catch (error) {

      console.log(error);

    }
  };

  /* =========================
     GROUP BY SHOP NAME
  ========================= */

  const groupedMobiles = Array.isArray(mobiles)

    ? mobiles.reduce(

        (groups, mobile) => {

          if (!groups[mobile.shopName]) {

            groups[mobile.shopName] = [];

          }

          groups[mobile.shopName].push(mobile);

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

        Object.keys(groupedMobiles).length === 0

          ? (

            <h2>
              No Mobiles Found
            </h2>

          )

          : (

            Object.keys(groupedMobiles).map(

              (shopName) => (

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

                    Array.isArray(
                      groupedMobiles[shopName]
                    ) &&

                    groupedMobiles[
                      shopName
                    ].map((mobile) => (

                      <div
                        className="mobile-card"
                        key={mobile._id}
                      >

                        <p>
                          <strong>
                            Brand :
                          </strong>

                          {" "}

                          {mobile.mobileBrand}
                        </p>

                        <p>
                          <strong>
                            Model :
                          </strong>

                          {" "}

                          {mobile.mobileModel}
                        </p>

                        <p>
                          <strong>
                            Issue :
                          </strong>

                          {" "}

                          {mobile.mobileIssue}
                        </p>

                        <p>
                          <strong>
                            Entry Date :
                          </strong>

                          {" "}

                          {mobile.entryDate}
                        </p>

                        <p>
                          <strong>
                            Status :
                          </strong>

                          {" "}

                          {mobile.status}
                        </p>

                        {/* REMAINING DAYS */}

                        <p
                          style={{

                            color:

                              mobile.remainingDays === 3

                                ? "green"

                                : mobile.remainingDays === 2

                                ? "lime"

                                : mobile.remainingDays === 1

                                ? "orange"

                                : "red",

                            fontWeight:
                              "bold",

                            fontSize:
                              "18px",
                          }}
                        >

                          {

                            mobile.remainingDays === 3

                              ? "🟢 3 Days Remaining"

                              : mobile.remainingDays === 2

                              ? "🟡 2 Days Remaining"

                              : mobile.remainingDays === 1

                              ? "🟠 1 Day Remaining"

                              : "🔴 Delivery Date Over"

                          }

                        </p>

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
                            className="complete-btn"
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

                    ))

                  }

                </div>

              )

            )

          )

      }

    </div>

  );
}

export default MobileList;