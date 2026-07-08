import { useEffect, useState } from "react";
import axios from "axios";

function MobileList() {

  /* =========================
     STATE
  ========================= */

  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filterStatus, setFilterStatus] = useState("All");

  const [processing, setProcessing] = useState(false);

  /* =========================
     GET MOBILES
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

    } finally {

      setLoading(false);

    }

  };

  /* =========================
     USE EFFECT
  ========================= */

  useEffect(() => {

    getMobiles();

    const interval = setInterval(() => {

      getMobiles();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  /* =========================
     DELETE MOBILE
  ========================= */

  const deleteMobile = async (id) => {

    if (!id) {

      alert("Invalid Mobile ID");

      return;

    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mobile?"
    );

    if (!confirmDelete) return;

    if (processing) return;

    setProcessing(true);

    try {

      await axios.delete(
        `https://pradheepsiva.onrender.com/api/mobile/delete/${id}`
      );

      alert("Mobile Deleted Successfully");

      getMobiles();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    } finally {

      setProcessing(false);

    }

  };

  /* =========================
     UPDATE STATUS
  ========================= */

  const updateStatus = async (id, status) => {

    if (!id) {

      alert("Invalid Mobile");

      return;

    }

    const validStatus = [
      "Pending",
      "Completed",
      "Return",
      "Out Delivery",
    ];

    if (!validStatus.includes(status)) {

      alert("Invalid Status");

      return;

    }

    if (processing) return;

    setProcessing(true);

    try {

      await axios.put(
        `https://pradheepsiva.onrender.com/api/mobile/status/${id}`,
        {
          status,
        }
      );

      alert(`Status Updated to ${status}`);

      getMobiles();

    } catch (error) {

      console.log(error);

      alert("Status Update Failed");

    } finally {

      setProcessing(false);

    }

  };
    /* =========================
     SEARCH & FILTER
  ========================= */

  const filteredMobiles = mobiles.filter((mobile) => {

    const searchText = search.trim().toLowerCase();

    const searchMatch =

      mobile.shopName?.toLowerCase().includes(searchText) ||

      mobile.mobileBrand?.toLowerCase().includes(searchText) ||

      mobile.mobileModel?.toLowerCase().includes(searchText) ||

      mobile.mobileIssue?.toLowerCase().includes(searchText);

    const statusMatch =
      filterStatus === "All"
        ? true
        : mobile.status === filterStatus;

    return searchMatch && statusMatch;

  });

  /* =========================
     GROUP BY SHOP
  ========================= */

  const groupedMobiles = filteredMobiles.reduce(

    (groups, mobile) => {

      if (!groups[mobile.shopName]) {

        groups[mobile.shopName] = [];

      }

      groups[mobile.shopName].push(mobile);

      return groups;

    },

    {}

  );

  /* =========================
     STATUS CLASS
  ========================= */

  const getStatusClass = (status) => {

    switch (status) {

      case "Completed":
        return "completed";

      case "Pending":
        return "pending";

      case "Return":
        return "return";

      case "Out Delivery":
        return "delivery";

      default:
        return "pending";

    }

  };

  /* =========================
     UI
  ========================= */

  return (

    <div className="mobile-list-page">

      <div className="page-header">

        <h1>📱 Mobile Repair List</h1>

        <p>Total Records : {filteredMobiles.length}</p>

      </div>

      {/* SEARCH & FILTER */}

      <div className="top-controls">

        <input
          type="text"
          placeholder="Search Shop / Brand / Model / Issue"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value.trimStart())
          }
        />

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value)
          }
        >

          <option value="All">All Status</option>

          <option value="Pending">Pending</option>

          <option value="Completed">Completed</option>

          <option value="Return">Return</option>

          <option value="Out Delivery">Out Delivery</option>

        </select>

      </div>

      {

        loading ? (

          <h2 className="loading-text">

            Loading...

          </h2>

        ) : Object.keys(groupedMobiles).length === 0 ? (

          <h2 className="empty-text">

            No Mobiles Found

          </h2>

        ) : (

          Object.keys(groupedMobiles).map((shopName) => (

            <div
              key={shopName}
              className="shop-section"
            >

              <h2 className="shop-title">

                🏪 {shopName}

              </h2>

              <div className="mobile-grid">
                {groupedMobiles[shopName].map((mobile) => {

  const today = new Date();

  const entryDate = new Date(mobile.entryDate);

  const diffTime = today - entryDate;

  const diffDays = Math.floor(
    diffTime / (1000 * 60 * 60 * 24)
  );

  return (

    <div
      className="mobile-card"
      key={mobile._id}
    >

      <h2>{mobile.mobileBrand}</h2>

      <p>
        <strong>Model :</strong>
        {mobile.mobileModel}
      </p>

      <p>
        <strong>Issue :</strong>
        {mobile.mobileIssue}
      </p>

      <p>
        <strong>Parts :</strong>

        {Array.isArray(mobile.mobileParts)
          ? mobile.mobileParts.join(", ")
          : "No Parts"}
      </p>

      <p>
        <strong>Entry :</strong>
        {mobile.entryDate}
      </p>

      <p>
        <strong>Remaining :</strong>
        {mobile.remainingDays || 0} Days
      </p>

      <div
        className={`status-box ${getStatusClass(
          mobile.status
        )}`}
      >
        {mobile.status}
      </div>

      {mobile.status !== "Completed" &&
        diffDays >= 3 && (

        <p className="alert-text">

          🔴 Pending More Than 3 Days

        </p>

      )}

      <div className="btn-group">

        <button
          className="pending-btn"
          disabled={processing}
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
          disabled={processing}
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
          disabled={processing}
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
          disabled={processing}
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
          disabled={processing}
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

})}

              </div>

            </div>

          ))

        )

      }

    </div>

  );

}

export default MobileList;
             