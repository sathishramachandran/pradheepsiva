import { useEffect, useState } from "react";
import axios from "axios";

function MobileForm() {
  const [mobileData, setMobileData] = useState({
    shopName: "",
    mobileBrand: "",
    mobileModel: "",
    mobileIssue: "",
    mobileParts: [],
    entryDate: "",
  });

  // OTHER ISSUE STATE
  const [otherIssue, setOtherIssue] = useState("");

  /* =========================
     SHOPS
  ========================= */

  const [shops, setShops] = useState([]);

  /* =========================
     GET SHOPS
  ========================= */

  const getShops = async () => {
    try {
      const response = await axios.get(
        "https://pradheepsiva.onrender.com/api/shop/all"
      );

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
     HANDLE INPUT CHANGE
  ========================= */

  const handleChange = (e) => {
    setMobileData({
      ...mobileData,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     HANDLE PARTS CHECKBOX
  ========================= */

  const handlePartsChange = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setMobileData({
        ...mobileData,
        mobileParts: [...mobileData.mobileParts, value],
      });
    } else {
      setMobileData({
        ...mobileData,
        mobileParts: mobileData.mobileParts.filter(
          (item) => item !== value
        ),
      });
    }
  };

  /* =========================
     HANDLE SUBMIT
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...mobileData,

      mobileIssue:
        mobileData.mobileIssue === "Other"
          ? otherIssue
          : mobileData.mobileIssue,
    };

    try {
      await axios.post(
        "https://pradheepsiva.onrender.com/api/mobile/add",
        finalData
      );

      alert("Mobile Added Successfully");

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
    }
  };

  /* =========================
     UI
  ========================= */

  return (
    <section className="newentry">
      <h2>Add New Mobile</h2>

      <form onSubmit={handleSubmit}>
        {/* SHOP DROPDOWN */}

        <select
          name="shopName"
          value={mobileData.shopName}
          onChange={handleChange}
          required
        >
          <option value="">Select Shop</option>

          {Array.isArray(shops) &&
            shops.map((shop) => (
              <option key={shop._id} value={shop.shopName}>
                {shop.shopName}
              </option>
            ))}
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
          <option value="">Select Issue</option>

          <option value="Dead">Dead</option>

          <option value="Charging">Charging</option>

          <option value="Display">Display</option>

          <option value="Network">Network</option>

          <option value="Software">Software</option>

          <option value="Mic">Mic</option>

          <option value="Water Lock">Water Lock</option>

          <option value="Other">Other</option>
        </select>

        {/* OTHER ISSUE */}

        {mobileData.mobileIssue === "Other" && (
          <input
            type="text"
            placeholder="Enter Other Issue"
            value={otherIssue}
            onChange={(e) => setOtherIssue(e.target.value)}
            required
          />
        )}

        {/* MOBILE PARTS */}

        <div className="partsBox">
          <h3>Select Mobile Parts</h3>

          <label>
            <input
              type="checkbox"
              value="Mic"
              checked={mobileData.mobileParts.includes("Mic")}
              onChange={handlePartsChange}
            />
            Mic
          </label>

          <label>
            <input
              type="checkbox"
              value="Display"
              checked={mobileData.mobileParts.includes("Display")}
              onChange={handlePartsChange}
            />
            Display
          </label>

          <label>
            <input
              type="checkbox"
              value="Battery"
              checked={mobileData.mobileParts.includes("Battery")}
              onChange={handlePartsChange}
            />
            Battery
          </label>

          <label>
            <input
              type="checkbox"
              value="Back Door"
              checked={mobileData.mobileParts.includes("Back Door")}
              onChange={handlePartsChange}
            />
            Back Door
          </label>
        </div>

        {/* ENTRY DATE */}

        <input
          type="date"
          name="entryDate"
          value={mobileData.entryDate}
          onChange={handleChange}
          required
        />

        {/* SUBMIT BUTTON */}

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default MobileForm;  