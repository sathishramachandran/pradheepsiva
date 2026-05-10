import { useEffect, useState } from "react";
import axios from "axios";

function MobileForm() {

  const [mobileData, setMobileData] = useState({
    shopName: "",
    mobileBrand: "",
    mobileModel: "",
    mobileIssue: "",
    entryDate: "",
  });

  /* =========================
     DYNAMIC SHOPS
  ========================= */

  const [shops, setShops] = useState([]);

  /* =========================
     GET SHOPS FROM BACKEND
  ========================= */

  const getShops = async () => {

    try {

      const response = await axios.get(
        "https://pradheepsiva.onrender.com/api/shop/all"
      );

      console.log(response.data);

      // IMPORTANT FIX
      setShops(response.data.data || []);

    } catch (error) {

      console.log(error);

      setShops([]);

    }
  };

  useEffect(() => {

    getShops();

  }, []);

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {

    setMobileData({

      ...mobileData,

      [e.target.name]:
        e.target.value,

    });
  };

  /* =========================
     HANDLE SUBMIT
  ========================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://pradheepsiva.onrender.com/api/mobile/add",
        mobileData
      );

      alert(
        "Mobile Added Successfully"
      );

      setMobileData({

        shopName: "",

        mobileBrand: "",

        mobileModel: "",

        mobileIssue: "",

        entryDate: "",

      });

    } catch (error) {

      console.log(error);

      alert("Submit Failed");

    }
  };

  /* =========================
     UI
  ========================= */

  return (

    <section className="newentry">

      <h2>
        Add New Mobile
      </h2>

      <form onSubmit={handleSubmit}>

        {/* SHOP DROPDOWN */}

        <select
          name="shopName"
          value={mobileData.shopName}
          onChange={handleChange}
          required
        >

          <option value="">
            Select Shop
          </option>

          {

            Array.isArray(shops) &&

            shops.map((shop) => (

              <option
                key={shop._id}
                value={shop.shopName}
              >

                {shop.shopName}

              </option>

            ))

          }

        </select>

        {/* MOBILE BRAND */}

        <input
          type="text"
          name="mobileBrand"
          placeholder="Mobile Brand"
          value={mobileData.mobileBrand}
          onChange={handleChange}
          required
        />

        {/* MOBILE MODEL */}

        <input
          type="text"
          name="mobileModel"
          placeholder="Mobile Model"
          value={mobileData.mobileModel}
          onChange={handleChange}
          required
        />

        {/* MOBILE ISSUE */}

        <select
          name="mobileIssue"
          value={mobileData.mobileIssue}
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

          <option value="Network">
            Network
          </option>

          <option value="software">
            Software
          </option>

          <option value="mic">
            Mic
          </option>
            <option value="water lock">
            water lock
          </option>
          </option>
            <option value="other">
            other
          </option>

        </select>

        {/* ENTRY DATE */}

        <input
          type="date"
          name="entryDate"
          value={mobileData.entryDate}
          onChange={handleChange}
          required
        />

        {/* SUBMIT BUTTON */}

        <button type="submit">

          Submit

        </button>

      </form>

    </section>
  );
}

export default MobileForm;