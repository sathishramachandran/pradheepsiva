import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  /* =========================
      STATE
  ========================= */

  const [mobiles, setMobiles] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const shopName = localStorage.getItem("shopName");
  const role = localStorage.getItem("role");

  /* =========================
      GET DATA
  ========================= */

  const getData = async () => {

    try {

      let mobileResponse;

      if (role === "shop" && shopName) {

        mobileResponse = await axios.get(
          `https://pradheepsiva.onrender.com/api/mobile/shop/${shopName}`
        );

      } else {

        mobileResponse = await axios.get(
          "https://pradheepsiva.onrender.com/api/mobile/all"
        );

      }

      const shopResponse = await axios.get(
        "https://pradheepsiva.onrender.com/api/shop/all"
      );

      setMobiles(mobileResponse.data.data || []);
      setShops(shopResponse.data.data || []);

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

    getData();

    const interval = setInterval(() => {

      getData();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  /* =========================
      DASHBOARD COUNTS
  ========================= */

  const totalMobiles = mobiles.length;

  const pendingMobiles = mobiles.filter(
    (item) => item.status === "Pending"
  ).length;

  const completedMobiles = mobiles.filter(
    (item) => item.status === "Completed"
  ).length;

  const deliveryMobiles = mobiles.filter(
    (item) => item.status === "Out Delivery"
  ).length;

  const returnMobiles = mobiles.filter(
    (item) => item.status === "Return"
  ).length;

  const totalShops = shops.length;

  const todayDate = new Date()
    .toISOString()
    .split("T")[0];

  const todayEntries = mobiles.filter(
    (item) => item.entryDate === todayDate
  ).length;

  /* =========================
      RECENT ENTRIES
  ========================= */

  const recentMobiles = mobiles.slice(0, 5);
    /* =========================
      UI
  ========================= */

  return (
    <div className="home-page">

      {/* Header */}

      <div className="welcome-box">

        <div>

          <h1>📱 Pradheepsiva Mobiles</h1>

          <p>Mobile Service Management System</p>

          {shopName && (
            <h3>
              Welcome,
              <span> {shopName}</span>
            </h3>
          )}

        </div>

      </div>

      {/* Dashboard */}

      <div className="dashboard-grid">

        <div className="dashboard-card total-card">

          <h4>Total Mobiles</h4>

          <h2>{totalMobiles}</h2>

        </div>

        <div className="dashboard-card pending-card">

          <h4>Pending</h4>

          <h2>{pendingMobiles}</h2>

        </div>

        <div className="dashboard-card completed-card">

          <h4>Completed</h4>

          <h2>{completedMobiles}</h2>

        </div>

        <div className="dashboard-card delivery-card">

          <h4>Out Delivery</h4>

          <h2>{deliveryMobiles}</h2>

        </div>

        <div className="dashboard-card return-card">

          <h4>Returned</h4>

          <h2>{returnMobiles}</h2>

        </div>

        {role === "admin" && (

          <div className="dashboard-card shop-card">

            <h4>Total Shops</h4>

            <h2>{totalShops}</h2>

          </div>

        )}

        <div className="dashboard-card today-card">

          <h4>Today's Entries</h4>

          <h2>{todayEntries}</h2>

        </div>

      </div>

      {/* Recent Entries */}

      <div className="recent-section">

        <div className="section-header">

          <h2>Recent Mobile Entries</h2>

          <span>Total : {totalMobiles}</span>

        </div>

        {loading ? (

          <h3>Loading...</h3>

        ) : recentMobiles.length === 0 ? (

          <h3>No Records Found</h3>

        ) : (

          <table>

            <thead>

              <tr>

                <th>Shop</th>

                <th>Brand</th>

                <th>Model</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {recentMobiles.map((item) => (

                <tr key={item._id}>

                  <td>{item.shopName}</td>

                  <td>{item.mobileBrand}</td>

                  <td>{item.mobileModel}</td>

                  <td>

                    <span
                      className={
                        item.status === "Completed"
                          ? "status completed"
                          : item.status === "Pending"
                          ? "status pending"
                          : item.status === "Out Delivery"
                          ? "status delivery"
                          : "status returned"
                      }
                    >

                      {item.status}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* Footer */}

      <footer className="footer">

        <h3>Pradheepsiva Mobiles</h3>

        <p>Professional Mobile Service Management Software</p>

        <p>Developed by Sathish</p>

        <p>📞 9488909434</p>

      </footer>

    </div>
  );

}

export default Home;