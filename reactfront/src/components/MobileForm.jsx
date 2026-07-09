import { useEffect, useState } from "react";

import axios from "axios";

function MobileForm() {

  /* =========================
     STATE
  ========================= */

  const [mobileData, setMobileData] =
    useState({

      shopName: "",

      mobileBrand: "",

      mobileModel: "",

      mobileIssue: "",

      mobileParts: [],

      entryDate: "",

    });

  const [shops, setShops] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [otherIssue, setOtherIssue] =
    useState("");

  /* =========================
     GET SHOPS
  ========================= */

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

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (e) => {

    setMobileData({

      ...mobileData,

      [e.target.name]:
        e.target.value,

    });

  };

  /* =========================
     HANDLE PARTS
  ========================= */

  const handlePartsChange = (
    e
  ) => {

    const value =
      e.target.value;

    if (e.target.checked) {

      setMobileData({

        ...mobileData,

        mobileParts: [

          ...mobileData.mobileParts,

          value,

        ],

      });

    } else {

      setMobileData({

        ...mobileData,

        mobileParts:
          mobileData.mobileParts.filter(
            (item) =>
              item !== value
          ),

      });

    }

  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    const finalData = {

      ...mobileData,

      mobileIssue:
        mobileData.mobileIssue ===
          "Other"

          ? otherIssue

          : mobileData.mobileIssue,

    };

    try {

      await axios.post(
        "https://pradheepsiva.onrender.com/api/mobile/add",
        finalData
      );

      alert(
        "Mobile Added Successfully"
      );

      /* RESET */

      setMobileData({

        shopName: "",

        mobileBrand: "",

        mobileModel: "",

        mobileIssue: "",

        mobileParts: [],

        entryDate: "",

      });

      setOtherIssue("");

    } catch (error) {

      console.log(error);

      alert("Submit Failed");

    } finally {

      setLoading(false);

    }

  };

  /* =========================
     PARTS LIST
  ========================= */

  const mobilePartsList = [

    "Display",

    "Battery",



    "Speaker",




    "Fingerprint",

    "Back Door",

    "Camera",



    "Button",



  ];

  /* =========================
     UI
  ========================= */

  return (

    <section className="mobile-form-page">

      <div className="mobile-form-container">

        <h2>
          Add Mobile Entry
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mobile-form"
        >

          {/* SHOP */}

          <select
            name="shopName"
            value={
              mobileData.shopName
            }
            onChange={handleChange}
            required
          >

            <option value="">
              Select Shop
            </option>

            {

              shops.map((shop) => (

                <option
                  key={shop._id}
                  value={
                    shop.shopName
                  }
                >

                  {
                    shop.shopName
                  }

                </option>

              ))

            }

          </select>

          {/* BRAND */}

          <input
            type="text"
            name="mobileBrand"
            placeholder="Mobile Brand"
            value={
              mobileData.mobileBrand
            }
            onChange={handleChange}
            required
          />

          {/* MODEL */}

          <input
            type="text"
            name="mobileModel"
            placeholder="Mobile Model"
            value={
              mobileData.mobileModel
            }
            onChange={handleChange}
            required
          />

          {/* ISSUE */}

          <select
            name="mobileIssue"
            value={
              mobileData.mobileIssue
            }
            onChange={handleChange}
            required
          >

            <option value="">
              Select Issue
            </option>

            <option value="Dead">
              Dead
            </option>

            <option value="Charging">
              Charging
            </option>

            <option value="Display">
              Display
            </option>

            <option value="Software">
              Software
            </option>

            <option value="Network">
              Network
            </option>

            <option value="Water Lock">
              Water Lock
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          {/* OTHER ISSUE */}

          {

            mobileData.mobileIssue ===
            "Other" && (

              <input
                type="text"
                placeholder="Enter Other Issue"
                value={otherIssue}
                onChange={(e) =>
                  setOtherIssue(
                    e.target.value
                  )
                }
                required
              />

            )

          }

          {/* PARTS */}

          <div className="parts-box">

            <h3>
              Select Parts
            </h3>

            <div className="parts-grid">

              {

                mobilePartsList.map(
                  (
                    part,
                    index
                  ) => (

                    <label
                      key={index}
                      className="part-item"
                    >

                      <input
                        type="checkbox"
                        value={part}
                        checked={mobileData.mobileParts.includes(
                          part
                        )}
                        onChange={
                          handlePartsChange
                        }
                      />

                      {part}

                    </label>

                  )
                )

              }

            </div>

          </div>

          {/* ENTRY DATE */}

          <input
            type="date"
            name="entryDate"
            value={
              mobileData.entryDate
            }
            onChange={handleChange}
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >

            {

              loading

                ? "Submitting..."

                : "Add Mobile"

            }

          </button>

        </form>

      </div>

    </section>

  );

}

export default MobileForm;